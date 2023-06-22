import { EventList } from "events/components";
import { EventProvider } from "events/components/EventProvider";
import "./App.css";
import { Header } from "./shared/components";

function App() {
  return (
    <div className="App">
      <Header title="Calendar Event Management Application" />
      <div className="mt-5">
        <EventProvider>
          <div className="container-fluid">
            <div className="d-flex flex-row">
              <div className="col-sm-12">
                <EventList />
              </div>
            </div>
          </div>
        </EventProvider>
      </div>
    </div>
  );
}

export default App;
