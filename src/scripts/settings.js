import Button from '@material-ui/core/Button';
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import React, { useState } from 'react';
import { useStoreon } from 'storeon/react';
import Modal from 'react-modal';
import SettingsIcon from '@material-ui/icons/Settings';

import Logo from '../icons/logo.svg';
import packageInfo from '../../package.json';
import { Toggler } from './toggler';
import { loadJson, saveJson } from './utils';

export function Settings() {
  // Local state here is only because initial thought it would affect all tabs. We can ignore it in sync plugin
  const [modalOpen, setModalOpen] = useState(false);

  const { dispatch, darkMode, data } = useStoreon('darkMode', 'data');

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function exportData() {
    let date = new Date()
      .toISOString()
      .slice(0, 16)
      .replace(/:/, '-');

    saveJson(
      { data },
      `${packageInfo.name}_v${packageInfo.version.replace(/\./g, '-')}_${date}`
    );
  }

  function importData() {
    Promise.resolve()
      .then(() => loadJson())
      .then(({ data }) => {
        dispatch('setData', data);
      });
  }

  function toggleDarkMode(value) {
    dispatch('setDarkMode', value);
  }

  return (
    <div>
      <Button
        className="button navigation__button"
        onClick={openModal}
        title="Menu"
      >
        <SettingsIcon />
      </Button>

      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={{ overlay: { zIndex: 100 } }}
        contentLabel="Example Modal"
      >
        <Button
          onClick={closeModal}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem'
          }}
        >
          Close
        </Button>
        <h2 style={{ marginTop: 0 }}>Settings</h2>
        <Button
          className="button"
          onClick={exportData}
          title="Export data to the file"
        >
          <CloudDownloadOutlinedIcon />
          &nbsp;Export Data
        </Button>
        &nbsp;
        <Button
          className="button"
          onClick={importData}
          title="Import data from the file"
        >
          <CloudUploadOutlinedIcon />
          &nbsp;Import data
        </Button>
        <br />
        <div style={{ padding: '1rem 0' }}>
          <Toggler
            checked={darkMode}
            label="Dark theme"
            toggle={toggleDarkMode}
          />
        </div>
        <hr />
        <a
          className="logo"
          href="https://arturparkhisenko.github.io/netabrex/"
          rel="noopener noreferrer"
          target="_blank"
          title="Netabrex"
        >
          <Logo />
        </a>
      </Modal>
    </div>
  );
}
