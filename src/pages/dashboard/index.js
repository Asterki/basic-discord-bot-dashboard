export const getServerSideProps = async (context) => {
    // Check if the user is logged in, if not, redirect to the login page
    if (!context.req.user)
        return {
            redirect: {
                destination: "/api/auth/redirect",
                permanent: false,
            },
        };

    return {
        // Pass the props to the page
        props: {
            user: context.req.user,
            userServers: context.req.user.guilds,
        },
    };
};

const Dashboard = (props) => {
    // Generate a map of the user's servers
    const servers = props.userServers.map((server) => {
        // Sort out the servers in which the user doesn't have permissions
        // let permissions = new discord.Permissions(server.permissions)
        // if (!permissions.has("MANAGE_GUILD")) return;

        return (
            <li key={server.id}>
                <a href={`/dashboard/${server.id}`}>{server.name}</a>
            </li>
        );
    });

    return (
        <div>
            <h1>
                Hello {props.user.username}#{props.user.discriminator} Please select a server
            </h1>

            <ul>{servers}</ul>
        </div>
    );
};

export default Dashboard;
