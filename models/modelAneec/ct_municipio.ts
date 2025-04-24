import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ct_municipioAttributes {
  id: number;
  municipio: string;
}

export type ct_municipioPk = "id";
export type ct_municipioId = ct_municipio[ct_municipioPk];
export type ct_municipioOptionalAttributes = "id" | "municipio";
export type ct_municipioCreationAttributes = Optional<ct_municipioAttributes, ct_municipioOptionalAttributes>;

export class ct_municipio extends Model<ct_municipioAttributes, ct_municipioCreationAttributes> implements ct_municipioAttributes {
  id!: number;
  municipio!: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof ct_municipio {
    return ct_municipio.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    municipio: {
      type: DataTypes.STRING(300),
      allowNull: false,
      defaultValue: "0"
    }
  }, {
    sequelize,
    tableName: 'ct_municipio',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
