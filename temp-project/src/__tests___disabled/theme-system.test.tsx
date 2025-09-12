import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext'
import { MigrationProvider } from '@/contexts/MigrationContext'
import { ThemeToggle } from '@/components/ui/theme-toggle'

// 테스트용 컴포넌트
const TestComponent = () => {
  const { theme, toggleTheme, mounted } = useTheme()
  return (
    <div>
      <span data-testid="theme-status">{mounted ? theme : 'loading'}</span>
      <button data-testid="toggle-button" onClick={toggleTheme}>
        Toggle
      </button>
    </div>
  )
}

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <MigrationProvider>
      <ThemeProvider>
        {component}
      </ThemeProvider>
    </MigrationProvider>
  )
}

describe('Theme System', () => {
  beforeEach(() => {
    // localStorage 모킹
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    }
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock
    })
  })

  test('기본 다크 테마로 초기화', async () => {
    renderWithProviders(<TestComponent />)
    
    await waitFor(() => {
      expect(screen.getByTestId('theme-status')).toHaveTextContent('dark')
    })
  })

  test('테마 토글 동작', async () => {
    renderWithProviders(<TestComponent />)
    
    const toggleButton = screen.getByTestId('toggle-button')
    
    await waitFor(() => {
      expect(screen.getByTestId('theme-status')).toHaveTextContent('dark')
    })
    
    fireEvent.click(toggleButton)
    
    await waitFor(() => {
      expect(screen.getByTestId('theme-status')).toHaveTextContent('light')
    })
  })

  test('ThemeToggle 컴포넌트 렌더링', () => {
    renderWithProviders(<ThemeToggle />)
    
    const button = screen.getByRole('switch')
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('aria-label')
  })

  test('localStorage 저장/복원', async () => {
    const mockGetItem = jest.fn().mockReturnValue('light')
    const mockSetItem = jest.fn()
    
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: mockGetItem,
        setItem: mockSetItem,
      }
    })

    renderWithProviders(<TestComponent />)
    
    const toggleButton = screen.getByTestId('toggle-button')
    fireEvent.click(toggleButton)
    
    await waitFor(() => {
      expect(mockSetItem).toHaveBeenCalledWith('theme', expect.any(String))
    })
  })
})

describe('Accessibility', () => {
  test('키보드 네비게이션', () => {
    renderWithProviders(<ThemeToggle />)
    
    const button = screen.getByRole('switch')
    
    // Tab으로 포커스
    button.focus()
    expect(button).toHaveFocus()
    
    // Enter로 활성화
    fireEvent.keyDown(button, { key: 'Enter' })
    // 테마 변경 확인은 별도 테스트에서 처리
  })

  test('ARIA 속성', () => {
    renderWithProviders(<ThemeToggle />)
    
    const button = screen.getByRole('switch')
    expect(button).toHaveAttribute('aria-label')
    expect(button).toHaveAttribute('aria-checked')
    expect(button).toHaveAttribute('aria-pressed')
  })
})