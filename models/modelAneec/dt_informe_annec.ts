import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { dt_aspirante_aneec, dt_aspirante_aneecId } from './dt_aspirante_aneec';

export interface dt_informe_annecAttributes {
  id_informe: number;
  ruta_informe: string;
  dt_aspirante_id: number;
  ct_usuarios_in: number;
}

export type dt_informe_annecPk = "id_informe";
export type dt_informe_annecId = dt_informe_annec[dt_informe_annecPk];
export type dt_informe_annecOptionalAttributes = "id_informe";
export type dt_informe_annecCreationAttributes = Optional<dt_informe_annecAttributes, dt_informe_annecOptionalAttributes>;

export class dt_informe_annec extends Model<dt_informe_annecAttributes, dt_informe_annecCreationAttributes> implements dt_informe_annecAttributes {
  id_informe!: number;
  ruta_informe!: string;
  dt_aspirante_id!: number;
  ct_usuarios_in!: number;

  // dt_informe_annec belongsTo dt_aspirante_aneec via dt_aspirante_id
  dt_aspirante!: dt_aspirante_aneec;
  getDt_aspirante!: Sequelize.BelongsToGetAssociationMixin<dt_aspirante_aneec>;
  setDt_aspirante!: Sequelize.BelongsToSetAssociationMixin<dt_aspirante_aneec, dt_aspirante_aneecId>;
  createDt_aspirante!: Sequelize.BelongsToCreateAssociationMixin<dt_aspirante_aneec>;

  static initModel(sequelize: Sequelize.Sequelize): typeof dt_informe_annec {
    return dt_informe_annec.init({
    id_informe: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ruta_informe: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    dt_aspirante_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'dt_aspirante_aneec',
        key: 'id_aspirante'
      }
    },
    ct_usuarios_in: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'dt_informe_annec',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_informe" },
        ]
      },
      {
        name: "fk_dt_aspirante_id_informe",
        using: "BTREE",
        fields: [
          { name: "dt_aspirante_id" },
        ]
      },
    ]
  });
  }
}
