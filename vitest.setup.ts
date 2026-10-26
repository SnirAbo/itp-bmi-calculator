import '@testing-library/jest-dom'
import { configure } from '@testing-library/react'

// make queries more resilient on CI
configure({ asyncUtilTimeout: 2000 })
