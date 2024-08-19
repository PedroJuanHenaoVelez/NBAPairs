import React, { useState, useEffect } from "react";
import { Player } from "../Models/player.model";
import { PlayerDetail } from "./PlayerDetail";

export const ShowPlayer: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [pairs, setPairs] = useState<{ player1: Player, player2: Player }[]>([]);
    const [targetHeight, setTargetHeight] = useState<number | null>(null);

    const getPlayers = async () => {
        const response = await fetch('https://mach-eight.uc.r.appspot.com/');
        const data = await response.json();
        setPlayers(data.values);
    };

    useEffect(() => {
        getPlayers();
    }, []);

    const findPairs = (height: number) => {
        const playerPairs: { player1: Player, player2: Player }[] = [];
        const map = new Map<number, Player>();

        players.forEach(player => {
            const heightInInches = parseInt(player.h_in);

            const complement = height - heightInInches;
            if (map.has(complement)) {
                playerPairs.push({ player1: map.get(complement)!, player2: player });
            }

            map.set(heightInInches, player);
        });

        setPairs(playerPairs);
    };

    return (
        <div>
            <input
                type="number"
                value={targetHeight ?? ''}
                onChange={(e) => setTargetHeight(parseInt(e.target.value))}
                placeholder="Enter height in inches"
            />
            <button onClick={() => targetHeight !== null && findPairs(targetHeight)}>
                Find Pairs
            </button>

            {pairs.length > 0 ? (
                pairs.map((pair, index) => (
                    <div key={index} className="pair-container">
                        <div className="player-detail">
                            <PlayerDetail player={pair.player1} />
                        </div>
                        <div className="player-detail">
                            <PlayerDetail player={pair.player2} />
                        </div>
                    </div>
                ))
            ) : (
                <p className="no-pairs">No pairs found.</p>
            )}
        </div>
    );
};
