import Datagraphs from '@datalanguage/datagraphs-client';

const datagraphs = new Datagraphs({
    apiKey: process.env.DATAGRAPHS_API_KEY,
    clientId: 'DAKpLb3q8B0dldRSu2lgmsx5uwsyDWjR',
    clientSecret: process.env.DATAGRAPHS_CLIENT_SECRET,
    projectId: 'game-backlog'
});

export default datagraphs;