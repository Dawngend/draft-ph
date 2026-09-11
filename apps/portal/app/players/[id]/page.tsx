import { getPlayerById, players } from "@draft-ph/protocol/fixtures";
import { notFound } from "next/navigation";
import { PlayerCard } from "../../../components/player-card";

export function generateStaticParams() {
  return players.map((player) => ({ id: player.id }));
}

export default async function PlayerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const player = getPlayerById(id);

  if (!player) {
    notFound();
  }

  return <PlayerCard player={player} />;
}
