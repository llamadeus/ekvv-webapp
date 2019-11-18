import { Card } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';


/**
 * NotFound component
 *
 * @returns {*}
 */
export default function NotFound() {
  return (
    <Card title="Nix gefunden 😵">
      <p>Was auch immer du gerade suchst, hier findest du es nicht.</p>

      Und jetzt hopp hopp zurück zur <Link to="/">Start&shy;seite</Link>.
    </Card>
  );
}
