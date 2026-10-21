// export interface ResponseWord {
//   value: number;
// }

// Format renvoyé par la fonction serverless (celui de l'API word2vec) : similarité entre -1 et 1
export interface ResponseWord {
  result: number;
}
