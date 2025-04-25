import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { ct_municipio, ct_municipioId } from './ct_municipio';
import type { dt_aspirante_aneec, dt_aspirante_aneecId } from './dt_aspirante_aneec';

export interface dt_diagnostico_aneecAttributes {
  id_diagnostico: number;
  curp: string;
  nombreCompleto: string;
  ct_municipio_id: number;
  tipo_necesidad: string;
  rehabilitacion_fisica: 'S' | 'N';
  ruta_diagnostico: string;
  dt_aspirante_id: number;
  ct_usuarios_in: number;
}

export type dt_diagnostico_aneecPk = "id_diagnostico";
export type dt_diagnostico_aneecId = dt_diagnostico_aneec[dt_diagnostico_aneecPk];
export type dt_diagnostico_aneecOptionalAttributes = "id_diagnostico";
export type dt_diagnostico_aneecCreationAttributes = Optional<dt_diagnostico_aneecAttributes, dt_diagnostico_aneecOptionalAttributes>;

export class dt_diagnostico_aneec extends Model<dt_diagnostico_aneecAttributes, dt_diagnostico_aneecCreationAttributes> implements dt_diagnostico_aneecAttributes {
  id_diagnostico!: number;
  curp!: string;
  nombreCompleto!: string;
  ct_municipio_id!: number;
  tipo_necesidad!: string;
  rehabilitacion_fisica!: 'S' | 'N';
  ruta_diagnostico!: string;
  dt_aspirante_id!: number;
  ct_usuarios_in!: number;

  // dt_diagnostico_aneec belongsTo ct_municipio via ct_municipio_id
  ct_municipio!: ct_municipio;
  getCt_municipio!: Sequelize.BelongsToGetAssociationMixin<ct_municipio>;
  setCt_municipio!: Sequelize.BelongsToSetAssociationMixin<ct_municipio, ct_municipioId>;
  createCt_municipio!: Sequelize.BelongsToCreateAssociationMixin<ct_municipio>;
  // dt_diagnostico_aneec belongsTo dt_aspirante_aneec via dt_aspirante_id
  dt_aspirante!: dt_aspirante_aneec;
  getDt_aspirante!: Sequelize.BelongsToGetAssociationMixin<dt_aspirante_aneec>;
  setDt_aspirante!: Sequelize.BelongsToSetAssociationMixin<dt_aspirante_aneec, dt_aspirante_aneecId>;
  createDt_aspirante!: Sequelize.BelongsToCreateAssociationMixin<dt_aspirante_aneec>;

  static initModel(sequelize: Sequelize.Sequelize): typeof dt_diagnostico_aneec {
    return dt_diagnostico_aneec.init({
    id_diagnostico: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    curp: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    nombreCompleto: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    ct_municipio_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ct_municipio',
        key: 'id_municipio'
      }
    },
    tipo_necesidad: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    rehabilitacion_fisica: {
      type: DataTypes.ENUM('S','N'),
      allowNull: false
    },
    ruta_diagnostico: {
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
    tableName: 'dt_diagnostico_aneec',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_diagnostico" },
        ]
      },
      {
        name: "fk_ct_municipio_id_diagnostico",
        using: "BTREE",
        fields: [
          { name: "ct_municipio_id" },
        ]
      },
      {
        name: "fk_dt_aspirante_id",
        using: "BTREE",
        fields: [
          { name: "dt_aspirante_id" },
        ]
      },
    ]
  });
  }
}
