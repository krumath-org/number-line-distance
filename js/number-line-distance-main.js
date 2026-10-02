// Copyright 2020-2026, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author John Blanco
 * @author Saurabh Totey
 */

// Must be first: sets Kantumruy Pro before any PhetFont is constructed at import time.
import './applyKantumruyFontFamily.js';

import localeProperty from '../../joist/js/i18n/localeProperty.js';
import PreferencesModel from '../../joist/js/preferences/PreferencesModel.js';
import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import SimulationPreferencesContentNode from './common/view/SimulationPreferencesContentNode.js';
import createLanguageSwitch from './createLanguageSwitch.js';
import NLDExploreScreen from './explore/NLDExploreScreen.js';
import NLDGenericScreen from './generic/NLDGenericScreen.js';
import NumberLineDistanceStrings from './NumberLineDistanceStrings.js';

const numberLineDistanceTitleStringProperty = NumberLineDistanceStrings[ 'number-line-distance' ].titleStringProperty;

const preferencesModel = new PreferencesModel( {
  simulationOptions: {
    customPreferences: [
      {
        createContent: () => new SimulationPreferencesContentNode()
      }
    ]
  }
} );

const simOptions = {
  preferencesModel: preferencesModel,
  credits: {
    leadDesign: 'Amanda McGarry',
    softwareDevelopment: 'John Blanco, Marla Schulz, Saurabh Totey',
    team: 'Kathy Perkins, Ian Whitacre',
    qualityAssurance: 'Steele Dalton, Jaron Droder, Clifford Hardin, Emily Miller, Devon Quispe, Nancy Salpepi, Kathryn Woessner',
    graphicArts: 'Mariah Hermsmeyer, Megan Lai'
  }
};

const launchSimulation = () => {
  // Khmer is the default locale for this KruMath fork.
  localeProperty.value = 'km';

  const screens = [
    new NLDExploreScreen( Tandem.ROOT.createTandem( 'exploreScreen' ) ),
    new NLDGenericScreen( Tandem.ROOT.createTandem( 'genericScreen' ) )
  ];
  const sim = new Sim( numberLineDistanceTitleStringProperty, screens, {
    ...simOptions,
    homeScreenWarningNode: createLanguageSwitch()
  } );
  sim.start();
};

const kantumruyFont = new FontFace(
  'Kantumruy Pro',
  `url(${new URL( 'images/KantumruyProKhmer.woff2', window.location.href )})`,
  { weight: '100 900' }
);

kantumruyFont.load().then( loadedFont => {
  document.fonts.add( loadedFont );
  simLauncher.launch( launchSimulation );
} ).catch( error => {
  console.error( 'Unable to load Kantumruy Pro; using the default font.', error );
  simLauncher.launch( launchSimulation );
} );
