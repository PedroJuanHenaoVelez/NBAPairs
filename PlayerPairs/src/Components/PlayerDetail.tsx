import React from 'react';
import { Player } from '../Models/player.model';

interface PlayerDetailProps {
    player: Player;
}

export const PlayerDetail: React.FC<PlayerDetailProps> = ({ player }) => {
    return(
        <div>
            <h1>{player.first_name} {player.last_name}</h1>
            <p>Height: {player.h_in} inches</p>
        </div>
    );
}