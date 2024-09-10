import React from "react";
import ReactDOM from "react-dom/client";
import esES from "antd/lib/locale/es_ES";
import App from "./App.tsx";
import "./index.css";
import RoutingLogin from "./routes/RoutingLogin.tsx";
import { ConfigProvider } from "antd";
import { defaultValidationMessages } from "./defaults/validation-messages.ts";

const root = document.getElementById("root");
const container = root ? ReactDOM.createRoot(root) : null;

if (true) {
	container.render(
		<ConfigProvider 
        locale={ esES }
        form={ {
          validateMessages: defaultValidationMessages
        } }
        >
			<RoutingLogin>
				<App children={ undefined } />
			</RoutingLogin>
		</ConfigProvider>,
	);
}
