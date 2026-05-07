import { calculateSheet } from "../services/pokemonSheetCalculator";

export function buildSheetResponse(sheet: any) {
  const calculated = calculateSheet(sheet, sheet.form);

  return {
    ...sheet,
    calculated,
  };
}