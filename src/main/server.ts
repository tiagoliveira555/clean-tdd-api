import './config/module-alias'
import app from '@/main/config/app'

app.listen(5050, () => {
  console.log('Server running at http://localhost:5050')
})
