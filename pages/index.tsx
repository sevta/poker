import {
  Affix,
  Button,
  Code,
  Container,
  Grid,
  Group,
  Modal,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Player from "components/elements/Player";
import Layout from "components/layouts/Layout";
import { chunk } from "lodash";
import { useState } from "react";
import { Hand, PlayerType, poker } from "utils";

export default function Index() {
  const _players: PlayerType[] = [
    {
      username: "player-1",
      result: "",
      hand: [],
    },
    {
      username: "player-2",
      result: "",
      hand: [],
    },
    {
      username: "player-3",
      result: "",
      hand: [],
    },
  ];
  const theme = useMantineTheme();
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [players, setPlayers] = useState(_players);
  const [openDebugModal, handlerOpenDebugModal] = useDisclosure(false);
  const [openNewPlayerModal, handlerNewPlayerModal] = useDisclosure(false);
  const [newPlayerUsername, setNewPlayerUsername] = useState("");

  function onStart() {
    setIsGameStarted(true);
    let cards = poker.getRandomCard();

    setPlayerCard(cards);
  }

  function setPlayerCard(cards: Hand[]) {
    let _chunk = chunk(cards, 5);
    let pl: PlayerType[] = [...players];
    pl.forEach((_, i) => {
      pl[i].result = poker.getResult(_chunk[i]);
      pl[i].hand = _chunk[i];
    });
    setPlayers(pl);
  }

  function onAddNewPlayer() {
    setIsGameStarted(false);
    resetPlayerHand();

    let pl: PlayerType[] = [...players];
    pl.push({
      username: newPlayerUsername,
      result: "",
      hand: [],
    });
    setPlayers(pl);
    setNewPlayerUsername("");
    handlerNewPlayerModal.close();
  }

  function resetPlayerHand() {
    let pl: PlayerType[] = [...players];
    pl.forEach((p, i) => {
      pl[i].result = "";
      pl[i].hand = [];
    });
    setPlayers(pl);
  }

  return (
    <Layout>
      <Modal
        size="xl"
        opened={openDebugModal}
        onClose={handlerOpenDebugModal.close}
        title={<Title order={3}>Debug</Title>}
      >
        <Container>
          <pre>
            <Code>{JSON.stringify(players, null, 2)}</Code>
          </pre>
        </Container>
      </Modal>

      <Modal
        opened={openNewPlayerModal}
        onClose={handlerNewPlayerModal.close}
        title={<Title order={3}>New player</Title>}
      >
        <TextInput
          label="username"
          value={newPlayerUsername}
          onChange={(e) => setNewPlayerUsername(e.target.value)}
        />
        <Button mt="sm" fullWidth onClick={onAddNewPlayer}>
          Add new
        </Button>
      </Modal>
      <Affix
        position={{
          bottom: theme.spacing.xl,
          right: theme.spacing.xl,
        }}
      >
        <Group>
          <Button onClick={onStart}>Start</Button>
          <Button color="dark" onClick={handlerOpenDebugModal.toggle}>
            Debug
          </Button>
          <Button color="dark" onClick={handlerNewPlayerModal.toggle}>
            Add new player
          </Button>
        </Group>
      </Affix>

      <Container fluid py="lg">
        <Grid>
          <Grid.Col xs={8}>
            {isGameStarted && (
              <Stack>
                {players.map((p, i) => (
                  <Player
                    key={i}
                    username={p.username}
                    hand={p.hand}
                    isCardOpen
                  />
                ))}
              </Stack>
            )}
          </Grid.Col>
          <Grid.Col xs={4}>
            <Text>the winner</Text>
            <pre>
              <Code>
                {JSON.stringify(poker.getTheWinner(players), null, 2)}
              </Code>
            </pre>
          </Grid.Col>
        </Grid>
      </Container>
    </Layout>
  );
}
