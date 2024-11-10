import { metaConfig } from '@k4itrunconfig';
import React from 'react';
import NProgress from 'nprogress';
import Router from "next/router";

interface NextNProgressProps {
  color?: string;
  startPosition?: number|any;
  stopDelayMs?: number;
  height?: number;
  showOnShallow?: boolean;
  options?: object;
}

class NextNProgress extends React.Component<NextNProgressProps> {
  static defaultProps = {
    color: metaConfig.tailwindColors.primary,
    startPosition: 0.3,
    stopDelayMs: 200,
    height: 3,
    showOnShallow: true,
  };

  timer: NodeJS.Timeout | null = null;

  
  routeChangeStart = (_: string, { shallow }: { shallow: boolean }) => {
    if (!shallow || this.props.showOnShallow) {
      NProgress.set(this.props.startPosition);
      NProgress.start();
    }
  };

  routeChangeEnd = (_: string, { shallow }: { shallow: boolean }) => {
    if (!shallow || this.props.showOnShallow) {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        NProgress.done(true);
      }, this.props.stopDelayMs);
    }
  };

  override componentDidMount() {
    const { options } = this.props;

    if (options) {
      NProgress.configure(options);
    }

    Router.events.on('routeChangeStart', this.routeChangeStart);
    Router.events.on('routeChangeComplete', this.routeChangeEnd);
    Router.events.on('routeChangeError', this.routeChangeEnd);
  }

  override componentWillUnmount() {
    Router.events.off('routeChangeStart', this.routeChangeStart);
    Router.events.off('routeChangeComplete', this.routeChangeEnd);
    Router.events.off('routeChangeError', this.routeChangeEnd);
  }

  override render() {
    const { color, height } = this.props;
    return (
      <style jsx global>{`
        #nprogress .bar {
          background: ${color};
          position: fixed;
          z-index: 9999999;
          top: 0;
          left: 0;
          width: 100%;
          height: ${height}px;
        }
      `}</style>
    );
  }
}

export default NextNProgress;
