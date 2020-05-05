import React, { useEffect, useState  } from 'react';

export default props => {
    const [versions, setVersions] = useState([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
		let versionAr = [];
		await fetch(`http://desafioonline.webmotors.com.br/api/OnlineChallenge//Version?ModelID=${props.model}`).then(
            response => response.json().then(data => {
                data.map(version => {
                    versionAr.push(version);
                    return versionAr;
                });	
			})
        );
        setVersions(versionAr); 
    }, [props.model]);
    
    return (
        versions.map(version => {
            return <li key={version.ID}>
                <span>{version.Name}</span>
            </li>;
        })
    )
}