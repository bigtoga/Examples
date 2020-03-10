let _ = require('lodash');
let v = require('./validation');

let isValidJsonObject = (value) => {
    if (_.isNil(value)) {
        return {
            result: false,
            message: 'Value cannot be null or undefined'
        };
    } else {
        return {
            result: _.isPlainObject(value),
            message: 'Value must be a valid JSON object'
        };
    }
};

let extensionValidations = {
    name: v.validationUtilities.isNotNullOrWhitespace,
    publisher: v.validationUtilities.isNotNullOrWhitespace,
    type: v.validationUtilities.isNotNullOrWhitespace,
    typeHandlerVersion: v.validationUtilities.isNotNullOrWhitespace,
    autoUpgradeMinorVersion: v.validationUtilities.isBoolean,
    settings: isValidJsonObject,
    protectedSettings: isValidJsonObject
};

let vmExtensionValidations = {
    vms: (value) => {
        if (_.isNil(value) || !_.isArray(value) || value.length === 0) {
            return {
                result: false,
                message: 'Value (Array) cannot be null, undefined or empty'
            };
        } else {
            return {
                result: true
            };
        }
    },
    extensions: (value) => {
        if (_.isNil(value) || !_.isArray(value) || value.length === 0) {
            return {
                result: false,
                message: 'Value (Array) cannot be null, undefined or empty'
            };
        }

        return {
            validations: extensionValidations
        };
    }
};

function merge(settings) {
    return settings;
}

function process({ settings, buildingBlockSettings, defaultSettings }) {
    let buildingBlockErrors = v.validate({
        settings: buildingBlockSettings,
        validations: {
            subscriptionId: v.validationUtilities.isGuid,
            resourceGroupName: v.validationUtilities.isNotNullOrWhitespace,
        }
    });

    if (buildingBlockErrors.length > 0) {
        throw new Error(JSON.stringify(buildingBlockErrors));
    }

    let merged = merge(settings);

    let errors = v.validate({
        settings: merged,
        validations: vmExtensionValidations
    });

    if (errors.length > 0) {
        throw new Error(JSON.stringify(errors));
    }

    let results = transform(merged);
    // WARNING!  We have to transform this differently for the extension building block!!!!
    results.extensionsProtectedSettings = {};
    results.extensions = _.map(results.extensions, (extension, index) => {
        results.extensionsProtectedSettings[index.toString()] = extension.extensionProtectedSettings;
        delete extension.extensionProtectedSettings;
        return extension;
    });
    return {
        resourceGroups: [],
        parameters: results
    };
}

function transform(param) {
    let accumulator = { extensions: [] };
    param.forEach((value) => {
        value.extensions.forEach((ext) => {
            let setting = {
                name: ext.name,
                vms: value.vms
            };

            setting.extensionProtectedSettings = { value: '{}' };
            if (ext.protectedSettings.hasOwnProperty('reference') && ext.protectedSettings.reference.hasOwnProperty('keyVault')) {
                setting.extensionProtectedSettings = ext.protectedSettings;
            } else {
                setting.extensionProtectedSettings = { value: JSON.stringify(ext.protectedSettings) };
            }
            let extension = _.cloneDeep(ext);
            delete extension.protectedSettings;
            delete extension.name;
            setting.extensionSettings = extension;
            accumulator.extensions.push(setting);
        });
    });
    return accumulator;
}

exports.process = process;
exports.transform = transform;
exports.merge = merge;
exports.validations = extensionValidations;