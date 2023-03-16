module.exports = (sequelize, Sequelize) => {
    const Prices = sequelize.define('prices',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            price: {
                type: Sequelize.FLOAT,
                allowNull: false,
                validate: {
                    isFloat: true
                }
            },
            fromDate: {
                type: Sequelize.DATE,
                validate: {
                    isDate: true
                }
            },
            untilDate: {
                type: Sequelize.DATE,
                validate: {
                    isDate: true
                    /*,
                    isAfter: fromDate*/
                }
            }
        },
        {
            freezeTableName: true,
            timestamps: false
        }
    );
    return Prices;
}