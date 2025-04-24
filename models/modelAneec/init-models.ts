import type { Sequelize } from "sequelize";
import { ct_municipio as _ct_municipio } from "./ct_municipio";
import type { ct_municipioAttributes, ct_municipioCreationAttributes } from "./ct_municipio";
import { dt_aspirante_aneec as _dt_aspirante_aneec } from "./dt_aspirante_aneec";
import type { dt_aspirante_aneecAttributes, dt_aspirante_aneecCreationAttributes } from "./dt_aspirante_aneec";
import { dt_diagnostico_aneec as _dt_diagnostico_aneec } from "./dt_diagnostico_aneec";
import type { dt_diagnostico_aneecAttributes, dt_diagnostico_aneecCreationAttributes } from "./dt_diagnostico_aneec";
import { dt_informes_annec as _dt_informes_annec } from "./dt_informes_annec";
import type { dt_informes_annecAttributes, dt_informes_annecCreationAttributes } from "./dt_informes_annec";

export {
  _ct_municipio as ct_municipio,
  _dt_aspirante_aneec as dt_aspirante_aneec,
  _dt_diagnostico_aneec as dt_diagnostico_aneec,
  _dt_informes_annec as dt_informes_annec,
};

export type {
  ct_municipioAttributes,
  ct_municipioCreationAttributes,
  dt_aspirante_aneecAttributes,
  dt_aspirante_aneecCreationAttributes,
  dt_diagnostico_aneecAttributes,
  dt_diagnostico_aneecCreationAttributes,
  dt_informes_annecAttributes,
  dt_informes_annecCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const ct_municipio = _ct_municipio.initModel(sequelize);
  const dt_aspirante_aneec = _dt_aspirante_aneec.initModel(sequelize);
  const dt_diagnostico_aneec = _dt_diagnostico_aneec.initModel(sequelize);
  const dt_informes_annec = _dt_informes_annec.initModel(sequelize);

  dt_diagnostico_aneec.belongsTo(dt_aspirante_aneec, { as: "dt_aspirante_aneec", foreignKey: "dt_aspirante_aneec_id"});
  dt_aspirante_aneec.hasMany(dt_diagnostico_aneec, { as: "dt_diagnostico_aneecs", foreignKey: "dt_aspirante_aneec_id"});
  dt_informes_annec.belongsTo(dt_aspirante_aneec, { as: "dt_aspirante", foreignKey: "dt_aspirante_id"});
  dt_aspirante_aneec.hasMany(dt_informes_annec, { as: "dt_informes_annecs", foreignKey: "dt_aspirante_id"});

  return {
    ct_municipio: ct_municipio,
    dt_aspirante_aneec: dt_aspirante_aneec,
    dt_diagnostico_aneec: dt_diagnostico_aneec,
    dt_informes_annec: dt_informes_annec,
  };
}
