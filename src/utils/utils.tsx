import * as React from 'react'

class Utils {

  public static lazyload(loader: () => Promise<any>) {
    const LazyComponent = React.lazy(loader)
    const Lazyload: React.FunctionComponent = (props: any) => {
      return (
        <React.Suspense fallback={(
          <div
            style={{
              padding: 30,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <span>Loading</span>
          </div>
        )}>
          <LazyComponent {...props} />
        </React.Suspense>
      )
    }
    return Lazyload
  }

}

export default Utils
