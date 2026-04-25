import "dotenv/config";
import { Stat } from "@prisma/client";
import { prisma } from "../src/lib/prisma";


async function main() {
  console.log("🌱 Iniciando seed...");

  //
  // LIMPEZA
  //

  await prisma.pokemonSheetMove.deleteMany();
  await prisma.pokemonSheetCondition.deleteMany();
  await prisma.sheetPermission.deleteMany();
  await prisma.pokemonSheet.deleteMany();

  await prisma.pokemonForm.deleteMany();
  await prisma.pokemonSpecies.deleteMany();

  await prisma.nature.deleteMany();

  //
  // NATURES
  //

  await prisma.nature.createMany({
    data: [
      {
        name: "Adamant",
        increaseStat: Stat.ATTACK,
        decreaseStat: Stat.SP_ATTACK,
      },
      {
        name: "Modest",
        increaseStat: Stat.SP_ATTACK,
        decreaseStat: Stat.ATTACK,
      },
      {
        name: "Jolly",
        increaseStat: Stat.SPEED,
        decreaseStat: Stat.SP_ATTACK,
      },
      {
        name: "Bold",
        increaseStat: Stat.DEFENSE,
        decreaseStat: Stat.ATTACK,
      },
      {
        name: "Timid",
        increaseStat: Stat.SPEED,
        decreaseStat: Stat.ATTACK,
      },
    ],
  });

  console.log("✅ Natures criadas");

  //
  // SPECIES + FORMS
  //

  const bulbasaur = await prisma.pokemonSpecies.create({
    data: {
      name: "Bulbasaur",
      pokedexId: 1,
      height: 0.7,
      weight: 6.9,
      rarity: 2,
      rationBase: 1,
      forms: {
        create: {
          name: "base",
          spriteUrl:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",

          hp: 45,
          attack: 49,
          defense: 49,
          spAttack: 65,
          spDefense: 65,
          speed: 45,

          type1: "GRASS",
          type2: "POISON",

          strength: 1,
          intelligence: 2,
          jump: 1,
          run: 1,
          swim: 0,
          fly: 0,
          dive: 0,
          dig: 0,
        },
      },
    },
  });

  const charmander = await prisma.pokemonSpecies.create({
    data: {
      name: "Charmander",
      pokedexId: 4,
      height: 0.6,
      weight: 8.5,
      rarity: 2,
      rationBase: 1,
      forms: {
        create: {
          name: "base",
          spriteUrl:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",

          hp: 39,
          attack: 52,
          defense: 43,
          spAttack: 60,
          spDefense: 50,
          speed: 65,

          type1: "FIRE",
          type2: null,

          strength: 1,
          intelligence: 2,
          jump: 2,
          run: 2,
          swim: 0,
          fly: 0,
          dive: 0,
          dig: 0,
        },
      },
    },
  });

  const squirtle = await prisma.pokemonSpecies.create({
    data: {
      name: "Squirtle",
      pokedexId: 7,
      height: 0.5,
      weight: 9.0,
      rarity: 2,
      rationBase: 1,
      forms: {
        create: {
          name: "base",
          spriteUrl:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",

          hp: 44,
          attack: 48,
          defense: 65,
          spAttack: 50,
          spDefense: 64,
          speed: 43,

          type1: "WATER",
          type2: null,

          strength: 1,
          intelligence: 2,
          jump: 1,
          run: 1,
          swim: 3,
          fly: 0,
          dive: 2,
          dig: 0,
        },
      },
    },
  });

  const pikachu = await prisma.pokemonSpecies.create({
    data: {
      name: "Pikachu",
      pokedexId: 25,
      height: 0.4,
      weight: 6.0,
      rarity: 3,
      rationBase: 1,
      forms: {
        create: {
          name: "base",
          spriteUrl:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",

          hp: 35,
          attack: 55,
          defense: 40,
          spAttack: 50,
          spDefense: 50,
          speed: 90,

          type1: "ELECTRIC",
          type2: null,

          strength: 1,
          intelligence: 2,
          jump: 2,
          run: 3,
          swim: 0,
          fly: 0,
          dive: 0,
          dig: 0,
        },
      },
    },
  });

  const eevee = await prisma.pokemonSpecies.create({
    data: {
      name: "Eevee",
      pokedexId: 133,
      height: 0.3,
      weight: 6.5,
      rarity: 3,
      rationBase: 1,
      forms: {
        create: {
          name: "base",
          spriteUrl:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png",

          hp: 55,
          attack: 55,
          defense: 50,
          spAttack: 45,
          spDefense: 65,
          speed: 55,

          type1: "NORMAL",
          type2: null,

          strength: 1,
          intelligence: 2,
          jump: 2,
          run: 2,
          swim: 0,
          fly: 0,
          dive: 0,
          dig: 0,
        },
      },
    },
  });

  const pidgey = await prisma.pokemonSpecies.create({
    data: {
      name: "Pidgey",
      pokedexId: 16,
      height: 0.3,
      weight: 1.8,
      rarity: 1,
      rationBase: 1,
      forms: {
        create: {
          name: "base",
          spriteUrl:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png",

          hp: 40,
          attack: 45,
          defense: 40,
          spAttack: 35,
          spDefense: 35,
          speed: 56,

          type1: "NORMAL",
          type2: "FLYING",

          strength: 0,
          intelligence: 1,
          jump: 1,
          run: 1,
          swim: 0,
          fly: 3,
          dive: 0,
          dig: 0,
        },
      },
    },
  });

  console.log("✅ Pokémon base criados");

  //
  // RESUMO
  //

  const totalSpecies = await prisma.pokemonSpecies.count();
  const totalForms = await prisma.pokemonForm.count();
  const totalNatures = await prisma.nature.count();

  console.log("📊 Seed concluído:");
  console.log(`Species: ${totalSpecies}`);
  console.log(`Forms: ${totalForms}`);
  console.log(`Natures: ${totalNatures}`);
}

main()
  .catch((error) => {
    console.error("❌ Erro no seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
