import axios from "axios";

export const getServerSideProps = async (context) => {
    // Check if the user is logged in, if not, redirect to the login page
    if (!context.req.user)
        return {
            redirect: {
                destination: "/api/auth/redirect",
                permanent: false,
            },
        };

    // Select the server given the id in the url
    const selectedServer = context.req.user.guilds.find((server) => {
        return server.id == context.params.server;
    });

    const serverPermissions = new discord.Permissions(server.permissions);

    // Check if the server is not in the user's session and if the user doesn't have permission to edit that server, if so, redirect out of the page
    if (!selectedServer || !serverPermissions.has("MANAGE_GUILD"))
        return {
            redirect: {
                destination: "/dashboard",
                permanent: false,
            },
        };

    // Get the server configuration
    const response = await axios({
        method: "POST",
        url: `${process.env.HOST}/api/servers/get-server-config`,
        headers: context.req.headers, // <== This part is important, if we don't add it, we won't pass our credentials, and so we wont the able to be authorized to get that information
        data: {
            serverID: selectedServer.id,
        },
    });

    return {
        // Pass the props to the page
        props: {
            user: context.req.user,
            selectedServer: selectedServer,
            selectedServerConfig: response.data, // This assuming there is a server with that
            host: process.env.HOST, // <== Important to save changes
        },
    };
};

const Dashboard = (props) => {
    const saveChanges = async (event) => {
        event.preventDefault();

        // Get the new prefix
        let newPrefix = document.querySelector("#prefix-input").value;

        // Post changes
        const response = await axios({
            method: "POST",
            url: `${props.host}/api/servers/save-server-config`,
            data: {
                serverID: props.selectedServer.id,
                newPrefix: newPrefix,
            },
        });

        // show the results
        console.log(response);
    };

    return (
        <div>
            <h1>
                Hello {props.user.username}#{props.user.discriminator}, you can configure {props.selectedServer.name} here
            </h1>

            <input defaultValue={props.selectedServerConfig.prefix} type="text" id="prefix-input" placeholder="Prefix" />
            <button onClick={saveChanges}>Save</button>
        </div>
    );
};

export default Dashboard;
