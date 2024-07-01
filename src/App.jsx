import { useState } from 'react'
import './App.css'
import TreeGrapher from './pages/TreeGrapher';

import NavBar from './Components/NavBar';
import ListGrapher from './pages/ListGrapher';
import GraphGrapher from './pages/GraphGrapher';
import PlayGroundGrapher from './pages/PlayGroundGrapher';

function App() {


	const [selectedGrapher, setSeletedGrapher] = useState(1);

	return (
		<>
			<NavBar setSeletedGrapher={setSeletedGrapher} />
			{selectedGrapher == 1 ?
				<TreeGrapher />
				:
				(selectedGrapher == 2 ?
					<ListGrapher />
					:
					(selectedGrapher===3?
						<GraphGrapher />:
						<PlayGroundGrapher/>
					)
				)

			}

		</>

	)
}

export default App
