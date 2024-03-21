const relationshipHasMany = (modelFather, modelson, foreingKey) => {
    modelFather.hasMany(modelson, { foreignKey: foreingKey });
};

const relationshipBelongsTo = (modelFather, modelson, foreingKey) => {
    modelFather.belongsTo(modelson, { foreignKey: foreingKey });
};

const bidirectionalHMandBT = (model1, model2, foreingKey) => {
    relationshipHasMany(model1, model2, foreingKey);
    relationshipBelongsTo(model2, model1, foreingKey);
}

module.exports={
    relationshipHasMany, relationshipBelongsTo, bidirectionalHMandBT
}