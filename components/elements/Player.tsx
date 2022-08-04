import { Group, Stack, Text, Title } from "@mantine/core";
import { Hand, poker } from "utils";
import PokerCard from "./PokerCard";

interface PlayerProps {
  refreshHand?: boolean;
  username?: string;
  hand: Hand[];
  isCardOpen?: boolean;
}

export default function Player({
  isCardOpen = false,
  hand,
  username,
}: PlayerProps) {
  return (
    <>
      <Group>
        {hand?.map((item, i) => (
          <PokerCard
            key={i}
            suits={item.suits}
            rank={item.rank}
            isCardOpen={isCardOpen}
          />
        ))}
        {isCardOpen && (
          <Stack spacing="sm">
            <Text weight={500} color="dimmed">
              {username}
            </Text>
            <Title>{poker.getResult(hand).rank}</Title>
            <Text size="sm" color="dimmed">
              card hand dominate {poker.getResult(hand).highest}
            </Text>
          </Stack>
        )}
      </Group>
    </>
  );
}
