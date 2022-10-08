import wordBank from "./wordle-bank.txt";

export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

const bank = ["first","alert","start"];
export const generateWordSet = async () => {
  let wordSet;
  let todaysWord;
  await fetch(wordBank)
    .then((response) => response.text())
    .then((result) => {
      const bank = result.split("\r\n");
      todaysWord = bank[Math.floor(Math.random() * bank.length)];
      console.log(bank);
      wordSet = new Set(bank);
    });
  return { wordSet, todaysWord };

};
