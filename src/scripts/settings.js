import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import React, { useState } from 'react';
import { useStoreon } from 'storeon/react';
import SettingsIcon from '@material-ui/icons/Settings';

import Logo from '../icons/logo.svg';
import { Modal } from './modal';
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
    // FIXME apply the new theme, ther's some weird theme issue if you'll change it dynamically
    location.reload();
  }

  return (
    <div className="settings">
      <Button className="navigation__button" onClick={openModal} title="Menu">
        <SettingsIcon />
      </Button>

      <Modal isOpen={modalOpen}>
        <Button
          onClick={closeModal}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem'
          }}
        >
          <CloseIcon />
        </Button>
        <h2 style={{ marginTop: 0 }}>Settings</h2>
        <Button onClick={exportData} title="Export data to the file">
          <CloudDownloadOutlinedIcon />
          &nbsp;Export Data
        </Button>
        &nbsp;
        <Button onClick={importData} title="Import data from the file">
          <CloudUploadOutlinedIcon />
          &nbsp;Import data
        </Button>
        <br />
        <div className="toggler-dark-theme">
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
