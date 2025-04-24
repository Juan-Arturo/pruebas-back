import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { dt_aspirante_aneec, dt_aspirante_aneecId } from './dt_aspirante_aneec';

export interface dt_diagnostico_aneecAttributes {
  id: number;
  tipoNecesidad: string;
  rehabilitacionFisica: 'S' | 'N';
  rutaDiagnostico: string;
  dt_aspirante_aneec_id: number;
  ct_usuarios_in: number;
  fecha_in: Date;
  ct_usuarios_at?: number;
  fecha_at?: Date;
}

export type dt_diagnostico_aneecPk = "id";
export type dt_diagnostico_aneecId = dt_diagnostico_aneec[dt_diagnostico_aneecPk];
export type dt_diagnostico_aneecOptionalAttributes = "id" | "fecha_in" | "ct_usuarios_at" | "fecha_at";
export type dt_diagnostico_aneecCreationAttributes = Optional<dt_diagnostico_aneecAttributes, dt_diagnostico_aneecOptionalAttributes>;

export class dt_diagnostico_aneec extends Model<dt_diagnostico_aneecAttributes, dt_diagnostico_aneecCreationAttributes> implements dt_diagnostico_aneecAttributes {
  id!: number;
  tipoNecesidad!: string;
  rehabilitacionFisica!: 'S' | 'N';
  rutaDiagnostico!: string;
  dt_aspirante_aneec_id!: number;
  ct_usuarios_in!: number;
  fecha_in!: Date;
  ct_usuarios_at?: number;
  fecha_at?: Date;

  // dt_diagnostico_aneec belongsTo dt_aspirante_aneec via dt_aspirante_aneec_id
  dt_aspirante_aneec!: dt_aspirante_aneec;
  getDt_aspirante_aneec!: Sequelize.BelongsToGetAssociationMixin<dt_aspirante_aneec>;
  setDt_aspirante_aneec!: Sequelize.BelongsToSetAssociationMixin<dt_aspirante_aneec, dt_aspirante_aneecId>;
  createDt_aspirante_aneec!: Sequelize.BelongsToCreateAssociationMixin<dt_aspirante_aneec>;

  static initModel(sequelize: Sequelize.Sequelize): typeof dt_diagnostico_aneec {
    return dt_diagnostico_aneec.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tipoNecesidad: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    rehabilitacionFisica: {
      type: DataTypes.ENUM('S','N'),
      allowNull: false
    },
    rutaDiagnostico: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    dt_aspirante_aneec_id: {
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
    tableName: 'dt_diagnostico_aneec',
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
        name: "dt_aspirante_aneec_id",
        using: "BTREE",
        fields: [
          { name: "dt_aspirante_aneec_id" },
        ]
      },
    ]
  });
  }
}
