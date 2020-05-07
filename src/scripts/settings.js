import { Button } from 'reakit/Button';
import Octicon, {
  CloudDownload,
  CloudUpload,
  Gear
} from '@primer/octicons-react';
import React, { useState } from 'react';
import { useStoreon } from 'storeon/react';
import Modal from 'react-modal';

import Logo from '../icons/logo.svg';
import { loadJson, saveJson } from './utils';
import packageInfo from '../../package.json';

export function Settings() {
  // Local state here is only because initial thought it would affect all tabs. We can ignore it in sync plugin
  const [modalOpen, setModalOpen] = useState(false);

  const { dispatch, data } = useStoreon('data');

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

  return (
    <div>
      <Button
        className="button navigation__button"
        onClick={openModal}
        title="Menu"
      >
        <Octicon icon={Gear} aria-hidden="true" />
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
          <Octicon icon={CloudDownload} aria-hidden="true" />
          &nbsp;Export Data
        </Button>
        &nbsp;
        <Button
          className="button"
          onClick={importData}
          title="Import data from the file"
        >
          <Octicon icon={CloudUpload} aria-hidden="true" />
          &nbsp;Import data
        </Button>
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
