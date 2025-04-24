import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { dt_diagnostico_aneec, dt_diagnostico_aneecId } from './dt_diagnostico_aneec';
import type { dt_informes_annec, dt_informes_annecId } from './dt_informes_annec';

export interface dt_aspirante_aneecAttributes {
  id: number;
  curp: string;
  nombre: string;
  aPaterno: string;
  aMaterno: string;
  correo: string;
  fechaNacimiento: string;
  instituto: string;
  licenciatura: string;
  direccion: string;
  cPostal: string;
  ct_municipio_id: number;
  localidad: string;
  rutaINE: string;
  rutaComprobanteEstudio: string;
  rutaComprobanteDomicilio: string;
  rutaCartaCompromiso: string;
  rutaCartaCompromisoTutor: string;
  rutaAvisoPrivacidadAspirante: string;
  rutaAvisoPrivacidadUsuario: string;
  ct_usuarios_in: number;
  fecha_in: Date;
  ct_usuarios_at?: number;
  fecha_at?: Date;
}

export type dt_aspirante_aneecPk = "id";
export type dt_aspirante_aneecId = dt_aspirante_aneec[dt_aspirante_aneecPk];
export type dt_aspirante_aneecOptionalAttributes = "id" | "fecha_in" | "ct_usuarios_at" | "fecha_at";
export type dt_aspirante_aneecCreationAttributes = Optional<dt_aspirante_aneecAttributes, dt_aspirante_aneecOptionalAttributes>;

export class dt_aspirante_aneec extends Model<dt_aspirante_aneecAttributes, dt_aspirante_aneecCreationAttributes> implements dt_aspirante_aneecAttributes {
  id!: number;
  curp!: string;
  nombre!: string;
  aPaterno!: string;
  aMaterno!: string;
  correo!: string;
  fechaNacimiento!: string;
  instituto!: string;
  licenciatura!: string;
  direccion!: string;
  cPostal!: string;
  ct_municipio_id!: number;
  localidad!: string;
  rutaINE!: string;
  rutaComprobanteEstudio!: string;
  rutaComprobanteDomicilio!: string;
  rutaCartaCompromiso!: string;
  rutaCartaCompromisoTutor!: string;
  rutaAvisoPrivacidadAspirante!: string;
  rutaAvisoPrivacidadUsuario!: string;
  ct_usuarios_in!: number;
  fecha_in!: Date;
  ct_usuarios_at?: number;
  fecha_at?: Date;

  // dt_aspirante_aneec hasMany dt_diagnostico_aneec via dt_aspirante_aneec_id
  dt_diagnostico_aneecs!: dt_diagnostico_aneec[];
  getDt_diagnostico_aneecs!: Sequelize.HasManyGetAssociationsMixin<dt_diagnostico_aneec>;
  setDt_diagnostico_aneecs!: Sequelize.HasManySetAssociationsMixin<dt_diagnostico_aneec, dt_diagnostico_aneecId>;
  addDt_diagnostico_aneec!: Sequelize.HasManyAddAssociationMixin<dt_diagnostico_aneec, dt_diagnostico_aneecId>;
  addDt_diagnostico_aneecs!: Sequelize.HasManyAddAssociationsMixin<dt_diagnostico_aneec, dt_diagnostico_aneecId>;
  createDt_diagnostico_aneec!: Sequelize.HasManyCreateAssociationMixin<dt_diagnostico_aneec>;
  removeDt_diagnostico_aneec!: Sequelize.HasManyRemoveAssociationMixin<dt_diagnostico_aneec, dt_diagnostico_aneecId>;
  removeDt_diagnostico_aneecs!: Sequelize.HasManyRemoveAssociationsMixin<dt_diagnostico_aneec, dt_diagnostico_aneecId>;
  hasDt_diagnostico_aneec!: Sequelize.HasManyHasAssociationMixin<dt_diagnostico_aneec, dt_diagnostico_aneecId>;
  hasDt_diagnostico_aneecs!: Sequelize.HasManyHasAssociationsMixin<dt_diagnostico_aneec, dt_diagnostico_aneecId>;
  countDt_diagnostico_aneecs!: Sequelize.HasManyCountAssociationsMixin;
  // dt_aspirante_aneec hasMany dt_informes_annec via dt_aspirante_id
  dt_informes_annecs!: dt_informes_annec[];
  getDt_informes_annecs!: Sequelize.HasManyGetAssociationsMixin<dt_informes_annec>;
  setDt_informes_annecs!: Sequelize.HasManySetAssociationsMixin<dt_informes_annec, dt_informes_annecId>;
  addDt_informes_annec!: Sequelize.HasManyAddAssociationMixin<dt_informes_annec, dt_informes_annecId>;
  addDt_informes_annecs!: Sequelize.HasManyAddAssociationsMixin<dt_informes_annec, dt_informes_annecId>;
  createDt_informes_annec!: Sequelize.HasManyCreateAssociationMixin<dt_informes_annec>;
  removeDt_informes_annec!: Sequelize.HasManyRemoveAssociationMixin<dt_informes_annec, dt_informes_annecId>;
  removeDt_informes_annecs!: Sequelize.HasManyRemoveAssociationsMixin<dt_informes_annec, dt_informes_annecId>;
  hasDt_informes_annec!: Sequelize.HasManyHasAssociationMixin<dt_informes_annec, dt_informes_annecId>;
  hasDt_informes_annecs!: Sequelize.HasManyHasAssociationsMixin<dt_informes_annec, dt_informes_annecId>;
  countDt_informes_annecs!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof dt_aspirante_aneec {
    return dt_aspirante_aneec.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    curp: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    aPaterno: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    aMaterno: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    correo: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    fechaNacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    instituto: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    licenciatura: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    cPostal: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    ct_municipio_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    localidad: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    rutaINE: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    rutaComprobanteEstudio: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    rutaComprobanteDomicilio: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    rutaCartaCompromiso: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    rutaCartaCompromisoTutor: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    rutaAvisoPrivacidadAspirante: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    rutaAvisoPrivacidadUsuario: {
      type: DataTypes.STRING(50),
      allowNull: false
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
    tableName: 'dt_aspirante_aneec',
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
