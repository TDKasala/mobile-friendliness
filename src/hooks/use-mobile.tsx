
import * as React from "react"

const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

export function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth
      setIsTablet(width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT)
    }
    
    window.addEventListener('resize', updateSize)
    updateSize() // Initial check
    
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return !!isTablet
}

export function useDeviceType() {
  const [deviceType, setDeviceType] = React.useState<'mobile' | 'tablet' | 'desktop' | undefined>(undefined)
  
  React.useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth
      if (width < MOBILE_BREAKPOINT) {
        setDeviceType('mobile')
      } else if (width < TABLET_BREAKPOINT) {
        setDeviceType('tablet')
      } else {
        setDeviceType('desktop')
      }
    }
    
    window.addEventListener('resize', updateDeviceType)
    updateDeviceType() // Initial check
    
    return () => window.removeEventListener('resize', updateDeviceType)
  }, [])
  
  return deviceType
}

// Custom hook for checking connection speed
export function useConnectionSpeed() {
  const [connectionType, setConnectionType] = React.useState<'slow' | 'medium' | 'fast'>('medium')
  
  React.useEffect(() => {
    // Connection speed detection
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection
    
    if (connection) {
      const updateConnectionType = () => {
        if (connection.effectiveType === '4g') {
          setConnectionType('fast')
        } else if (['3g', '2g'].includes(connection.effectiveType)) {
          setConnectionType('medium')
        } else {
          setConnectionType('slow')
        }
      }
      
      connection.addEventListener('change', updateConnectionType)
      updateConnectionType()
      
      return () => connection.removeEventListener('change', updateConnectionType)
    }
    
    // Fallback if Network Information API is not available
    const checkSpeed = async () => {
      try {
        const startTime = Date.now()
        const response = await fetch('/placeholder.svg', { 
          cache: 'no-store',
          method: 'HEAD'
        })
        const endTime = Date.now()
        const duration = endTime - startTime
        
        if (duration < 100) {
          setConnectionType('fast')
        } else if (duration < 300) {
          setConnectionType('medium')
        } else {
          setConnectionType('slow')
        }
      } catch (error) {
        console.error('Error checking connection speed:', error)
      }
    }
    
    checkSpeed()
  }, [])
  
  return connectionType
}
