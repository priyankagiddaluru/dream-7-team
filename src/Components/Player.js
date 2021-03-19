export default ({ player: { name, role, points }, player, addHandler, removeHandler }) => {
    const val = `${name} - ${role} - (${points})`;
    return <div>
        <span>{val}</span>
        <span style={{ padding: '10px' }}>
            <input style={{ backgroundColor: '#1f8476', color: 'white' }} type='button' value="Add player" onClick={() => addHandler(player)} />
        </span>
        <span style={{ padding: '10px' }}>
            <input style={{ backgroundColor: '#a91d1d', color: 'white' }} type='button' value="Remove player" onClick={() => removeHandler(player)} />
        </span>
    </div>
};