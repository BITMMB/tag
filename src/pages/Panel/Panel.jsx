import React, { useState, useEffect } from 'react';
import styles from './Panel.module.scss';
import 'antd/dist/reset.css';
import useOperationFactory from '../../operationFactory/useOperationFactory';
import TagViewer from '../Content/TagViewer';
import { Button, Layout, Menu, Input, Spin, Tooltip } from 'antd';
import { MENU_KEYS, menu } from './menu';
import { requestScanner } from '../../operationFactory/requestScanner/requestScanner';
import Errors from '../Content/Errors';
import logo from '../../assets/svg/logo.svg';
import { TOOLTIP_TEXT_SEC } from './constants';
import Competitors from '../Content/Competitors';
import AdCatcher from '../Content/AdCatcher';

const { Header, Footer } = Layout;

const App = () => {
  const [page, setPage] = useState(MENU_KEYS.zones);
  const [domains, setDomains] = useState({});
  const [competitors, setCompetitors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasBeenStarted, setHasBeenStarted] = useState(false);

  const [timerDuration, setTimerDuration] = useState(20);
  const [timerRemaining, setTimerRemaining] = useState(0);

  const { runFactory, operations, zones, resetOperations } =
    useOperationFactory({ domains });

  const progressPercent = timerDuration
    ? ((timerDuration - timerRemaining) / timerDuration) * 100
    : 0;

  useEffect(() => {
    let intervalId;
    if (isLoading && timerRemaining > 0) {
      intervalId = setInterval(() => {
        setTimerRemaining((prev) => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            clearInterval(intervalId);
            setIsLoading(false);
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isLoading, timerRemaining]);

  useEffect(() => {
    const domainsNotEmpty = domains && Object.keys(domains).length > 0;
    const zonesNotEmpty = zones && zones.length > 0;
    if (isLoading && (domainsNotEmpty || zonesNotEmpty)) {
      setIsLoading(false);
      setTimerRemaining(0);
    }
  }, [domains, zones, isLoading]);

  const handleStart = () => {
    setIsLoading(true);
    setTimerRemaining(timerDuration);
    setHasBeenStarted(true);
    requestScanner({
      resetOperations,
      setDomains,
      runFactory,
      zones,
      setCompetitors,
    });
  };

  chrome.runtime.sendMessage({ type: 'devtools', active: true });

  window.addEventListener('beforeunload', () => {
    chrome.runtime.sendMessage({ type: 'devtools', active: false });
  });

  return (
    <Layout>
      {isLoading && (
        <Spin
          percent={Math.round(progressPercent)}
          size="large"
          fullscreen={true}
        />
      )}
      <Header className={styles.header}>
        <img src={logo} className={styles.logo} alt="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[MENU_KEYS.zones]}
          items={menu}
          className={styles.menu}
          onClick={(item) => setPage(item.key)}
        />

        <Input
          type="number"
          value={timerDuration}
          onChange={(e) => setTimerDuration(Number(e.target.value))}
          className={styles.input}
          addonBefore={
            <Tooltip title={TOOLTIP_TEXT_SEC}>
              <span className={styles.inputTitle}>Время поиска (сек)</span>
            </Tooltip>
          }
        />
        <Button
          color="purple"
          className={styles.button}
          variant="solid"
          onClick={handleStart}
        >
          Запустить поиск
        </Button>
      </Header>

      <div className={styles.container}>
        {page === MENU_KEYS.zones && (
          <TagViewer
            operations={operations}
            zones={zones}
            domains={domains}
            hasBeenStarted={hasBeenStarted}
            isLoading={isLoading}
          />
        )}
        {page === MENU_KEYS.errors && <Errors zones={zones} />}
        {page === MENU_KEYS.competitors && (
          <Competitors competitors={competitors} />
        )}
        {page === MENU_KEYS.adCatcher && <AdCatcher />}
      </div>

      <Footer className={styles.footer}>
        Galaksion ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default App;
