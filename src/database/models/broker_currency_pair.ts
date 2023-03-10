import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const broker_currency_pair = sequelize.define(
    'broker_currency_pair',
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      broker_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        defaultValue: null,
      },
      currency: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
        validate: {
          len: [0, 255],
        },
      },
      url: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
        validate: {
          len: [0, 255],
        },
      },
      ip: {
        type: DataTypes.CHAR(39),
        allowNull: false,
        validate: {
          len: [0, 39],
        },
      },
      created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      modified: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      indexes: [],
      underscored: true,
      timestamps: false,
    },
  );

  broker_currency_pair.associate = (models) => {
    models.broker_currency_pair.belongsTo(models.broker, {
      as: 'broker',
      constraints: true,
      foreignKey: 'broker_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
  };

  return broker_currency_pair;
}
