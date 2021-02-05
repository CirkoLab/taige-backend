import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';

import './index.css';

function fetchPeople() {
    return axios.get('/api/people');
}

function doVote(id: number) {
    return axios.post('/api/people/vote', { id });
}

function App() {
    const [people, setPeople] = useState<any[]>([]);

    const fetch = () => fetchPeople().then(({ data }) => setPeople(data.data));

    useEffect(() => { fetch() }, []);

    return (
        <>
            {people.map(({ id, vote, name, desc }) => {
                return (
                    <div key={id} style={{ margin: 10 }}>
                        <span>{name}</span>
                        <span>{desc}</span>
                        <span>{vote} 票</span>
                        <button onClick={() => { doVote(id).then(() => fetch()) }}>投票</button>
                    </div>
                );
            })}
        </>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));