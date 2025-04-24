import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { dt_aspirante_aneec, dt_aspirante_aneecId } from './dt_aspirante_aneec';

export interface dt_informes_annecAttributes {
  id: number;
  rutaInforme: string;
  dt_aspirante_id: number;
  ct_usuarios_in: number;
  fecha_in: Date;
  ct_usuarios_at?: number;
  fecha_at?: Date;
}

export type dt_informes_annecPk = "id";
export type dt_informes_annecId = dt_informes_annec[dt_informes_annecPk];
export type dt_informes_annecOptionalAttributes = "id" | "fecha_in" | "ct_usuarios_at" | "fecha_at";
export type dt_informes_annecCreationAttributes = Optional<dt_informes_annecAttributes, dt_informes_annecOptionalAttributes>;

export class dt_informes_annec extends Model<dt_informes_annecAttributes, dt_informes_annecCreationAttributes> implements dt_informes_annecAttributes {
  id!: number;
  rutaInforme!: string;
  dt_aspirante_id!: number;
  ct_usuarios_in!: number;
  fecha_in!: Date;
  ct_usuarios_at?: number;
  fecha_at?: Date;

  // dt_informes_annec belongsTo dt_aspirante_aneec via dt_aspirante_id
  dt_aspirante!: dt_aspirante_aneec;
  getDt_aspirante!: Sequelize.BelongsToGetAssociationMixin<dt_aspirante_aneec>;
  setDt_aspirante!: Sequelize.BelongsToSetAssociationMixin<dt_aspirante_aneec, dt_aspirante_aneecId>;
  createDt_aspirante!: Sequelize.BelongsToCreateAssociationMixin<dt_aspirante_aneec>;

  static initModel(sequelize: Sequelize.Sequelize): typeof dt_informes_annec {
    return dt_informes_annec.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    rutaInforme: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    dt_aspirante_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'dt_aspirante_aneec',
        key: 'id'
      }
    },
    ct_usuarios_in: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fecha_in: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    ct_usuarios_at: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fecha_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'dt_informes_annec',
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
      {
        name: "dt_aspirante_id",
        using: "BTREE",
        fields: [
          { name: "dt_aspirante_id" },
        ]
      },
    ]
  });
  }
}
