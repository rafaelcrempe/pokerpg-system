import { z } from "zod";

export const patchSheetSchema = z.object({
  nickname: z.string().max(50).optional(),

  notes: z.string().max(10000).optional(),

  level: z.number().int().min(1).max(100).optional(),

  xp: z.number().int().min(0).optional(),

  currentHp: z.number().int().min(0).nullable().optional(),

  damageTaken: z.number().int().min(0).optional(),

  hpLevelPoints: z.number().int().min(0).optional(),
  atkLevelPoints: z.number().int().min(0).optional(),
  defLevelPoints: z.number().int().min(0).optional(),
  spAtkLevelPoints: z.number().int().min(0).optional(),
  spDefLevelPoints: z.number().int().min(0).optional(),
  speedLevelPoints: z.number().int().min(0).optional(),

  hpVita: z.number().int().min(0).optional(),
  atkVita: z.number().int().min(0).optional(),
  defVita: z.number().int().min(0).optional(),
  spAtkVita: z.number().int().min(0).optional(),
  spDefVita: z.number().int().min(0).optional(),
  speedVita: z.number().int().min(0).optional(),

  hpTemp: z.number().int().optional(),
  atkTemp: z.number().int().optional(),
  defTemp: z.number().int().optional(),
  spAtkTemp: z.number().int().optional(),
  spDefTemp: z.number().int().optional(),
  speedTemp: z.number().int().optional(),

  atkStage: z.number().int().min(-5).max(5).optional(),
  defStage: z.number().int().min(-5).max(5).optional(),
  spAtkStage: z.number().int().min(-5).max(5).optional(),
  spDefStage: z.number().int().min(-5).max(5).optional(),
  speedStage: z.number().int().min(-5).max(5).optional(),

  accuracyStage: z.number().int().min(-5).max(5).optional(),
  evasionStage: z.number().int().min(-5).max(5).optional(),

  critStage: z.number().int().min(0).max(5).optional(),
  antiCritStage: z.number().int().min(0).max(5).optional(),

  loyalty: z.number().int().min(0).optional(),

  training: z.number().int().min(0).optional(),

  affection: z.number().int().min(0).optional(),

  affectionXp: z.number().int().min(0).optional(),

  heldItemName: z.string().max(100).nullable().optional(),

  abilityName: z.string().max(100).nullable().optional(),

  otherSkills: z.string().max(2000).nullable().optional(),

  canDynamax: z.boolean().optional(),

  canGigantamax: z.boolean().optional(),

  isShiny: z.boolean().optional(),
});