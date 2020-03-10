'use strict';

let _ = require('lodash');
let validation = require('./validation');
let validationMessages = require('./validationMessages');

function getObject(collection, parentKey, stack, callback) {
    if (_.isPlainObject(collection)) {
        if (_.isNull(parentKey)) {
            stack.push(_.merge({}, stack[stack.length - 1], {
                subscriptionId: collection.subscriptionId,
                resourceGroupName: collection.resourceGroupName,
                location: collection.location
            }));
        }

        // See if we need to add the information
        if (callback(parentKey)) {
            collection.subscriptionId = stack[stack.length - 1].subscriptionId;
            collection.resourceGroupName = stack[stack.length - 1].resourceGroupName;
            collection.location = stack[stack.length - 1].location;
        }
    }

    return _.each(collection, (item, keyOrIndex) => {
        let hasPushed = false;
        if (_.isPlainObject(item)) {
            if (!_.isNil(item.resourceGroupName) || !_.isNil(item.subscriptionId) || !_.isNil(item.location)) {
                stack.push(_.merge({}, stack[stack.length - 1], {
                    subscriptionId: item.subscriptionId,
                    resourceGroupName: item.resourceGroupName,
                    location: item.location
                }));
                hasPushed = true;
            }

            item = getObject(item, _.isFinite(keyOrIndex) ? parentKey : keyOrIndex, stack, callback);

            if (hasPushed) {
                stack.pop();
            }
        } else if (_.isArray(item)) {
            item = getObject(item, keyOrIndex, stack, callback);
        }
    });
}

exports.resourceId = function (subscriptionId, resourceGroupName, resourceType, resourceName, subresourceName) {
    if (validation.utilities.isNullOrWhitespace(subscriptionId)) {
        throw new Error(`[resources:resourceId()] subscriptionId: ${validationMessages.StringCannotBeNullUndefinedEmptyOrOnlyWhitespace}`);
    }

    if (!validation.utilities.isGuid(subscriptionId)) {
        throw new Error(`[resources:resourceId()] subscriptionId: ${validationMessages.StringIsNotAValidGuid}`);
    }

    if (validation.utilities.isNullOrWhitespace(resourceGroupName)) {
        throw new Error(`[resources:resourceId()] resourceGroupName: ${validationMessages.StringCannotBeNullUndefinedEmptyOrOnlyWhitespace}`);
    }

    if (validation.utilities.isNullOrWhitespace(resourceType)) {
        throw new Error(`[resources:resourceId()] resourceType: ${validationMessages.StringCannotBeNullUndefinedEmptyOrOnlyWhitespace}`);
    }

    let resourceTypeParts = _.split(_.trimEnd(resourceType, '/'), '/');
    if ((resourceTypeParts.length < 2) || (resourceTypeParts.length > 3)) {
        throw new Error(`[resources:resourceId()] resourceType: Invalid length ${resourceTypeParts.length}`);
    }

    if ((resourceTypeParts.length === 2) && (validation.utilities.isNullOrWhitespace(resourceName))) {
        throw new Error(`[resources:resourceId()] resourceName: ${validationMessages.StringCannotBeNullUndefinedEmptyOrOnlyWhitespace}`);
    }

    // This is not strictly necessary, but could save from some misuse
    if ((resourceTypeParts.length === 2) && (!validation.utilities.isNullOrWhitespace(subresourceName))) {
        throw new Error(`[resources:resourceId()] subresourceName: ${validationMessages.resources.SubresourceNameShouldNotBeSpecifiedForTopLevelResourceType}`);
    }

    if ((resourceTypeParts.length === 3) && (validation.utilities.isNullOrWhitespace(subresourceName))) {
        throw new Error(`[resources:resourceId()] subresourceName: ${validationMessages.StringCannotBeNullUndefinedEmptyOrOnlyWhitespace}`);
    }

    let resourceId = `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/${resourceTypeParts[0]}/${resourceTypeParts[1]}/${resourceName}`;
    if (resourceTypeParts.length === 3) {
        resourceId = `${resourceId}/${resourceTypeParts[2]}/${subresourceName}`;
    }

    return resourceId;
};

exports.setupResources = function (settings, buildingBlockSettings, keyCallback) {
    let clone = _.cloneDeep(settings);
    return getObject(clone, null, [buildingBlockSettings], keyCallback);
};

exports.extractResourceGroups = (...resources) => {
    return _.uniqWith(_.map(_.reject(_.flattenDeep(resources), (value) => {
        return _.isNil(value);
    }), (value) => {
        return {
            subscriptionId: value.subscriptionId,
            resourceGroupName: value.resourceGroupName,
            location: value.location
        };
    }), _.isEqual);
};

exports.resourceReferenceValidations = {
    name: validation.validationUtilities.isNotNullOrWhitespace,
    subscriptionId: validation.validationUtilities.isGuid,
    resourceGroupName: validation.validationUtilities.isNotNullOrWhitespace
};