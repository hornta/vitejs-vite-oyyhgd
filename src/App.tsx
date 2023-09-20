
import './App.css'
import { Popover } from './popover/Popover'

function App() {
  return (
    <>
      <Popover placement="bottom-start">
            <Popover.Trigger asChild>
              <button>button
              </button>
            </Popover.Trigger>
            <Popover.Content>
              <Popover.ContentContainer className="flex flex-col overflow-hidden">
                123123123
              </Popover.ContentContainer>
            </Popover.Content>
          </Popover>
    </>
  )
}

export default App
