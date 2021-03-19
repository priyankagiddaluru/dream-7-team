import { useState } from 'react';
import players from '../players.json';
import Player from './Player';

export default () => {
    const [totalPoints, updateTotalPoints] = useState(0);
    const [selected, selectHandler] = useState([]);
    const [roleObj, updateRoleObj] = useState({
        Batsman: {
            count: 0,
            max: 3,
        },
        Bowler: {
            count: 0,
            max: 2,
        },
        'All-Rounder': {
            count: 0,
            max: 2,
        },
    });


    const addHandler = (player) => {
        const arr = [...selected];
        const { points, role } = player;

        if (selected.length === 7) {
            alert("Can't add more than 7 players");
            return;
        } else if (totalPoints + Number(points) > 75) {
            alert("Can't exceed 75 points");
            return;
        } else if (roleObj[role].count > roleObj[role].max) {
            alert(`Can't add more than ${roleObj[role].max} ${role}s`);
            return;
        }
        if (selected.find(({ id }) => id === player.id)) {
            alert('Player already selected');
            return;
        }
        updateRoleObj((data) => {
            const a = { ...data }
            a[role].count = a[role].count + 1;
            return a;
        });
        arr.push(player);
        updateTotalPoints(totalPoints + Number(points));
        selectHandler(arr);
    }

    const removeHandler = (player) => {
        let arr = [...selected];
        if (!(selected.find(({ id }) => id === player.id))) {
            alert('Player not selected');
            return;
        }

        arr = arr.filter(({ id }) => player.id !== id)
        updateTotalPoints(totalPoints - Number(player.points));
        updateRoleObj((data) => {
            const a = { ...data }
            a[player.role].count = a[player.role].count - 1;
            return a;
        });
        selectHandler(arr);
    }

    return <>
        <h1>Please select your Dream 7 team</h1>
        <div style={{ display: 'inline', float: 'left'}}>
            {players.map((player) => <Player
                key={player.id}
                player={player}
                addHandler={addHandler}
                removeHandler={removeHandler}
            />)}
        </div>
        <h1>Selected (Points - {totalPoints})</h1>
        <div>
            {selected.map((p) =>
                <div key={p.id}>{p.name} - {p.role}</div>
            )}
        </div>
    </>
}
