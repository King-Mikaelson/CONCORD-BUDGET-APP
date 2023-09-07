
type Props = {}

function LoadingIndicator({}: Props) {
  return (
    <div className="flex justify-center h-screen items-center">
    <div className="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    </div>
  )
}

export default LoadingIndicator