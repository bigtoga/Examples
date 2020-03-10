let _ = require('lodash');
let v = require('./validation');
let r = require('./resources');

const TEMPLATE_SETTINGS_DEFAULTS = {
    mode: 'Incremental',
    parameters: {}
};

let validModes = ['Complete', 'Incremental'];

let isValidMode = (mode) => {
    return v.utilities.isStringInArray(mode, validModes);
};

let templateValidations = {
    template: (value, parent) => {
        if ((_.isUndefined(value) && _.isUndefined(parent.templateLink)) ||
            (!_.isUndefined(value) && !_.isUndefined(parent.templateLink))) {
            return {
                result: false,
                message: 'Either template or templateLink must be specified, but not both'
            };
        }
        if (_.isUndefined(value) && !_.isUndefined(parent.templateLink)) {
            return {
                result: true
            };
        } else {
            return {
                result: !_.isNull(value),
                message: 'Value must be a non-null object'
            };
        }
    },
    templateLink: (value, parent) => {
        if ((_.isUndefined(value) && _.isUndefined(parent.template)) ||
            (!_.isUndefined(value) && !_.isUndefined(parent.template))) {
            return {
                result: false,
                message: 'Either template or templateLink must be specified, but not both'
            };
        }
        if (_.isUndefined(value) && !_.isUndefined(parent.template)) {
            return {
                result: true
            };
        } else {
            return {
                result: !v.utilities.isNullOrWhitespace(value),
                message: 'Value cannot be null or only whitespace'
            };
        }
    },
    parameters: (value, parent) => {
        if ((_.isUndefined(value) && _.isUndefined(parent.parametersLink)) ||
            (!_.isUndefined(value) && !_.isUndefined(parent.parametersLink))) {
            return {
                result: false,
                message: 'Either parameters or parametersLink must be specified, but not both'
            };
        }
        if (_.isUndefined(value) && !_.isUndefined(parent.parametersLink)) {
            return {
                result: true
            };
        } else {
            return {
                result: !_.isNull(value),
                message: 'Value must be a non-null object'
            };
        }
    },
    parametersLink: (value, parent) => {
        if ((_.isUndefined(value) && _.isUndefined(parent.parameters)) ||
            (!_.isUndefined(value) && !_.isUndefined(parent.parameters))) {
            return {
                result: false,
                message: 'Either parameters or parametersLink must be specified, but not both'
            };
        }
        if (_.isUndefined(value) && !_.isUndefined(parent.parameters)) {
            return {
                result: true
            };
        } else {
            return {
                result: !v.utilities.isNullOrWhitespace(value),
                message: 'Value cannot be null or only whitespace'
            };
        }
    },
    mode: (value) => {
        return {
            result: isValidMode(value),
            message: `Value must be one of the following values: ${validModes.join(',')}`
        };
    }
};

let validate = (settings) => {
    let errors = v.validate({
        settings: settings,
        validations: templateValidations
    });

    return errors;
};

let merge = ({ settings, buildingBlockSettings, defaultSettings }) => {
    let defaults = (defaultSettings) ? [TEMPLATE_SETTINGS_DEFAULTS, defaultSettings] : TEMPLATE_SETTINGS_DEFAULTS;

    let merged = r.setupResources(settings, buildingBlockSettings, (parentKey) => {
        return (parentKey === null);
    });

    return v.merge(merged, defaults);
};

function transform(settings) {
    let result = {
        resourceGroupName: settings.resourceGroupName,
        subscriptionId: settings.subscriptionId,
        location: settings.location,
        properties: {
            mode: settings.mode
        }
    };

    if (settings.template) {
        result.properties.template = settings.template;
    }

    if (settings.templateLink) {
        result.properties.templateLink = {
            uri: settings.templateLink
        };
    }
    if (settings.parameters) {
        result.properties.parameters = settings.parameters;
    }

    if (settings.parametersLink) {
        result.properties.parametersLink = {
            uri: settings.parametersLink
        };
    }

    return result;
}

function process({ settings, buildingBlockSettings, defaultSettings }) {
    settings = _.castArray(settings);

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

    let results = merge({
        settings: settings,
        buildingBlockSettings: buildingBlockSettings,
        defaultSettings: defaultSettings
    });

    let errors = validate(results);

    if (errors.length > 0) {
        throw new Error(JSON.stringify(errors));
    }

    results = _.transform(results, (result, setting) => {
        result.templates.push(transform(setting));
    }, {
            templates: []
        });

    // Get needed resource groups information.
    let resourceGroups = r.extractResourceGroups(results.templates);
    return {
        resourceGroups: resourceGroups,
        parameters: results
    };
}

exports.process = process;