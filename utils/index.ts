import { shuffle } from "lodash";

export type Suits = "spades" | "hearts" | "clubs" | "diamonds";

export type Hand = {
  rank: string;
  suits: Suits;
};

export type PlayerType = {
  username: string;
  result: any;
  hand: Hand[];
};

export const ranks = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "1",
];
export const suits: Suits[] = ["spades", "hearts", "clubs", "diamonds"];

export const rankings = [
  "High card",
  "Pair",
  "Two pairs",
  "Three of a kind",
  "Straight",
  "Flush",
  "Full house",
  "Four of a kind",
  "Straight flush",
  "Royal flush",
];

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const poker = {
  card: [] as any,

  getRandomCard() {
    let result: Hand[] = [];
    for (let j = 0; j < suits.length; j++) {
      for (let i = 0; i < ranks.length; i++) {
        result.push({
          rank: ranks[i],
          suits: suits[j],
        });
      }
    }

    return shuffle(result);
  },

  getDuplicateCard(card: Hand[]) {
    let cardDomination = this.getHandDomination(card);
    let counts: any = {};
    cardDomination.forEach(function (x) {
      counts[x] = (counts[x] || 0) + 1;
    });

    return counts;
  },

  getHighNumber(array: any[]) {
    let highIndex = 0;
    array.map((ele) => {
      if (ranks.indexOf(ele) > highIndex) {
        highIndex = ranks.indexOf(ele);
      }
    });
    return ranks[highIndex];
  },

  getHigesthCard(card: Hand[]) {
    let highIndex = 0;
    card?.map((ele) => {
      if (ranks.indexOf(ele.rank) > highIndex) {
        highIndex = ranks.indexOf(ele.rank);
      }
    });
    return ranks[highIndex];
  },

  getHandDomination(card: Hand[]) {
    return card?.map((ele) => ele.rank).sort();
  },

  getStraight(card: Hand[]) {
    let cardDomination = this.getHandDomination(card);
    return cardDomination.every(
      (ele, i) => i === 0 || +ele === +cardDomination[i - 1] + 1
    );
  },

  getOnePairs(card: Hand[]) {
    let cardDomination = this.getHandDomination(card);
    let pairs: any = [];

    cardDomination.map((ele, i) => {
      if (cardDomination[i] === cardDomination[i + 1]) {
        pairs.push(cardDomination[i]);
      }
    });
    if (pairs.length === 1) {
      this.card = pairs;
      return true;
    }
    return false;
  },

  getTwoPairs(card: Hand[]) {
    let cardDomination = this.getHandDomination(card);
    let pairs: any = [];

    cardDomination.map((ele, i) => {
      if (cardDomination[i] === cardDomination[i + 1]) {
        pairs.push(cardDomination[i]);
      }
    });

    if (pairs.length === 2) {
      this.card = this.getHighNumber(pairs);
      return true;
    }
    return false;
  },

  getThreeOfaKind(card: Hand[]) {
    let countDuplicateItems: any = this.getDuplicateCard(card);

    for (const prop in countDuplicateItems) {
      if (countDuplicateItems[prop] === 3) {
        this.card = [prop];
        return true;
      }
    }

    return false;
  },

  getFlush(card: Hand[]) {
    let cardSuits = card.map((ele) => ele.suits);
    this.card = [this.getHigesthCard(card)];

    return cardSuits.every((item) => item === cardSuits[0]);
  },

  getFullhouse(card: Hand[]) {
    let countDuplicateItems: any = this.getDuplicateCard(card);

    let duplicates = [];
    for (const prop in countDuplicateItems) {
      duplicates.push(countDuplicateItems[prop]);
    }

    if (
      (duplicates[0] === 3 && duplicates[1] === 2) ||
      (duplicates[1] === 3 && duplicates[0] === 2)
    ) {
      for (const prop in countDuplicateItems) {
        if (countDuplicateItems[prop] === 3) {
          this.card = [prop];
        }
      }
      return true;
    }

    return false;
  },

  getFourOfaKind(card: Hand[]) {
    let countDuplicateItems: any = this.getDuplicateCard(card);

    for (const prop in countDuplicateItems) {
      if (countDuplicateItems[prop] === 4) {
        this.card = [prop];

        return true;
      }
    }

    return false;
  },

  getStraightFlush(card: Hand[]) {
    if (this.getStraight(card) && this.getFlush(card)) {
      this.card = this.getHigesthCard(card);
      return true;
    }
    return false;
  },

  getRoyalFlush(card: Hand[]) {
    let cardSuits = card.map((ele) => ele.suits);
    let handRank = card.map((ele) => ele.rank);
    let pattern = ["1", "10", "11", "12", "13"];

    if (
      handRank.every((h) => pattern.includes(h)) &&
      cardSuits.every((item) => item === cardSuits[0])
    ) {
      return true;
    }
    return false;
  },

  getTheWinner(playerRankings: PlayerType[]) {
    let highIndex = 0;
    let playerIndex = 0;
    playerRankings.map((ele, index) => {
      if (rankings.indexOf(ele.result.rank) > highIndex) {
        highIndex = rankings.indexOf(ele.result.rank);
        playerIndex = index;
      }
    });
    return {
      rankings: rankings[highIndex],
      player: playerRankings[playerIndex].username,
    };
  },

  getResult(card: Hand[]) {
    if (this.getRoyalFlush(card)) {
      return {
        rank: rankings[9],
        highest: this.card,
      };
    } else if (this.getStraightFlush(card)) {
      return {
        rank: rankings[8],
        highest: this.card,
      };
    } else if (this.getFourOfaKind(card)) {
      return {
        rank: rankings[7],
        highest: this.card,
      };
    } else if (this.getFullhouse(card)) {
      return {
        rank: rankings[6],
        highest: this.card,
      };
    } else if (this.getFlush(card)) {
      return {
        rank: rankings[5],
        highest: this.card,
      };
    } else if (this.getStraight(card)) {
      return {
        rank: rankings[4],
        highest: this.card,
      };
    } else if (this.getThreeOfaKind(card)) {
      return {
        rank: rankings[3],
        highest: this.card,
      };
    } else if (this.getTwoPairs(card)) {
      return {
        rank: rankings[2],
        highest: this.card,
      };
    } else if (this.getOnePairs(card)) {
      return {
        rank: rankings[1],
        highest: this.card,
      };
    } else {
      return {
        rank: rankings[0],
        highest: [this.getHigesthCard(card)],
      };
    }
  },
};
