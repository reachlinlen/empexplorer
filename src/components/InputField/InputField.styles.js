import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& .MuiSvgIcon-root': {
      width: '32px',
      height: '32px',
    },
  }
}))

export default useStyles