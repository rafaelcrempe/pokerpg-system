export type StatName =
  | "hp"
  | "atk"
  | "def"
  | "spAtk"
  | "spDef"
  | "speed";

export type Stats = Record<StatName, number>;

type NatureStat =
  | "HP"
  | "ATTACK"
  | "DEFENSE"
  | "SP_ATTACK"
  | "SP_DEFENSE"
  | "SPEED";

type TierStat = {
  name: StatName;
  value: number;
};

type Form = {
  hp: number;
  attack: number;
  defense: number;
  spAttack: number;
  spDefense: number;
  speed: number;
};

type Nature = {
  increaseStat?: NatureStat;
  decreaseStat?: NatureStat;
} | null;

type Sheet = {
  level: number;

  hpLevelPoints: number;
  atkLevelPoints: number;
  defLevelPoints: number;
  spAtkLevelPoints: number;
  spDefLevelPoints: number;
  speedLevelPoints: number;

  hpVita: number;
  atkVita: number;
  defVita: number;
  spAtkVita: number;
  spDefVita: number;
  speedVita: number;

  hpTemp: number;
  atkTemp: number;
  defTemp: number;
  spAtkTemp: number;
  spDefTemp: number;
  speedTemp: number;

  atkStage: number;
  defStage: number;
  spAtkStage: number;
  spDefStage: number;
  speedStage: number;

  accuracyStage: number;
  evasionStage: number;
  critStage: number;
  antiCritStage: number;

  nature: Nature;
};

const statMap: Record<NatureStat, keyof Form> = {
  HP: "hp",
  ATTACK: "attack",
  DEFENSE: "defense",
  SP_ATTACK: "spAttack",
  SP_DEFENSE: "spDefense",
  SPEED: "speed",
};

function applyNature(form: Form, nature: Nature): Form {
  if (!nature) return { ...form };

  const modified = { ...form };

  if (nature.increaseStat && statMap[nature.increaseStat]) {
    modified[statMap[nature.increaseStat]] += 1;
  }

  if (nature.decreaseStat && statMap[nature.decreaseStat]) {
    modified[statMap[nature.decreaseStat]] -= 1;
  }

  return modified;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function getTiers(form: Form): TierStat[][] {
  const stats: TierStat[] = [
    { name: "hp", value: form.hp },
    { name: "atk", value: form.attack },
    { name: "def", value: form.defense },
    { name: "spAtk", value: form.spAttack },
    { name: "spDef", value: form.spDefense },
    { name: "speed", value: form.speed },
  ];

  stats.sort((a, b) => b.value - a.value);

  const tiers: TierStat[][] = [];

  for (const stat of stats) {
    const last = tiers[tiers.length - 1];

    if (!last || last[0].value !== stat.value) {
      tiers.push([stat]);
    } else {
      last.push(stat);
    }
  }

  return tiers;
}

function validateTiers(stats: Stats, tiers: TierStat[][]) {
  for (let i = 0; i < tiers.length; i++) {
    const currentTier = tiers[i];

    const higherStats = tiers
      .slice(0, i)
      .flat()
      .map((s) => s.name);

    for (const stat of currentTier) {
      for (const higher of higherStats) {
        if (stats[stat.name] >= stats[higher]) {
          throw new Error(
            `${stat.name} não pode alcançar ou ultrapassar ${higher}`
          );
        }
      }
    }
  }
}

function getStageMultiplier(stage: number) {
  const s = clamp(stage, -5, 5);

  if (s > 0) return 1 + 0.5 * s;
  if (s < 0) return 1 + 0.2 * s;

  return 1;
}

function applyStages(stats: Stats, sheet: Sheet): Stats {
  return {
    hp: stats.hp,

    atk: Math.floor(
      stats.atk * getStageMultiplier(sheet.atkStage)
    ),

    def: Math.floor(
      stats.def * getStageMultiplier(sheet.defStage)
    ),

    spAtk: Math.floor(
      stats.spAtk * getStageMultiplier(sheet.spAtkStage)
    ),

    spDef: Math.floor(
      stats.spDef * getStageMultiplier(sheet.spDefStage)
    ),

    speed: Math.floor(
      stats.speed * getStageMultiplier(sheet.speedStage)
    ),
  };
}

function getSecondary(sheet: Sheet) {
  return {
    accuracy: sheet.accuracyStage * 10,
    evasion: sheet.evasionStage * 10,
    crit: sheet.critStage * 10,
    antiCrit: sheet.antiCritStage * 10,
  };
}

export function calculateSheet(sheet: Sheet, form: Form) {
  // Nature modifica atributos base
  const modifiedForm = applyNature(form, sheet.nature);

  // Validação do total de vitaminas utilizadas
  const totalVitamins =
    sheet.hpVita +
    sheet.atkVita +
    sheet.defVita +
    sheet.spAtkVita +
    sheet.spDefVita +
    sheet.speedVita;

  if (totalVitamins > 6) {
    throw new Error(
      "A soma total das vitaminas não pode ultrapassar 6."
    );
  }

  // Vitaminas alteram os patamares
  const tierForm: Form = {
    hp: modifiedForm.hp + sheet.hpVita,
    attack: modifiedForm.attack + sheet.atkVita,
    defense: modifiedForm.defense + sheet.defVita,
    spAttack: modifiedForm.spAttack + sheet.spAtkVita,
    spDefense: modifiedForm.spDefense + sheet.spDefVita,
    speed: modifiedForm.speed + sheet.speedVita,
  };

  // pontos de nível disponíveis
  const totalPoints = sheet.level + 10;

  const usedPoints =
    sheet.hpLevelPoints +
    sheet.atkLevelPoints +
    sheet.defLevelPoints +
    sheet.spAtkLevelPoints +
    sheet.spDefLevelPoints +
    sheet.speedLevelPoints;

  if (usedPoints > totalPoints) {
    throw new Error(
      "Você distribuiu mais pontos do que o permitido."
    );
  }

  // Stats estruturais finais
  const baseStats: Stats = {
    hp: tierForm.hp + sheet.hpLevelPoints,

    atk: tierForm.attack + sheet.atkLevelPoints,

    def: tierForm.defense + sheet.defLevelPoints,

    spAtk: tierForm.spAttack + sheet.spAtkLevelPoints,

    spDef: tierForm.spDefense + sheet.spDefLevelPoints,

    speed: tierForm.speed + sheet.speedLevelPoints,
  };

  // Patamares consideram vitaminas
  const tiers = getTiers(tierForm);

  validateTiers(baseStats, tiers);

  const values = Object.values(baseStats);

  const max = Math.max(...values);
  const min = Math.min(...values);

  // Limite máximo de atributo
  if (sheet.level <= 20 && max > 20) {
    throw new Error(
      "Atributo não pode passar de 20 nesse nível."
    );
  }

  if (sheet.level > 20 && max > sheet.level) {
    throw new Error(
      "Atributo não pode passar do nível."
    );
  }

  // Distância máxima entre atributos
  if (max > min * 5) {
    throw new Error(
      "Distância entre atributos inválida."
    );
  }

  // Modificadores temporários
  const finalStats: Stats = {
    hp: baseStats.hp + sheet.hpTemp,

    atk: baseStats.atk + sheet.atkTemp,

    def: baseStats.def + sheet.defTemp,

    spAtk: baseStats.spAtk + sheet.spAtkTemp,

    spDef: baseStats.spDef + sheet.spDefTemp,

    speed: baseStats.speed + sheet.speedTemp,
  };

  const displayStats = applyStages(finalStats, sheet);

  const secondary = getSecondary(sheet);

  return {
    baseStats,
    finalStats,
    displayStats,
    secondary,

    stageMultipliers: {
      atk: getStageMultiplier(sheet.atkStage),

      def: getStageMultiplier(sheet.defStage),

      spAtk: getStageMultiplier(sheet.spAtkStage),

      spDef: getStageMultiplier(sheet.spDefStage),

      speed: getStageMultiplier(sheet.speedStage),
    },
  };
}