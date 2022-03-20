import init, { do_parse_zev, EventCollection } from '$lib/zevlib';
import { base } from '$app/paths';

const repoUrl = 'https://raw.githubusercontent.com/lepelog/skywardsword-tools/master/allzev';

const allFiles = [
  'Asura',
  'B100_1',
  'B100',
  'B101_1',
  'B101',
  'B200',
  'B201_1',
  'B201',
  'B210',
  'B300',
  'B301',
  'BirdTrap',
  'BoatCannon',
  'BossLockD101',
  'Common',
  'ControlPanel',
  'CraneMoguma',
  'D003_0',
  'D003_1',
  'D003_2',
  'D003_3',
  'D003_4',
  'D003_5',
  'D003_6',
  'D003_7',
  'D003_8',
  'D100',
  'D101',
  'D200',
  'D201_1',
  'D201',
  'D300_1',
  'D300',
  'D301_1',
  'D301',
  'DesertRobot',
  'DoorAnim',
  'DoorBoss',
  'DoorF',
  'DoorGate',
  'Entrance1A',
  'Entrance1B',
  'F000',
  'F001r',
  'F002r',
  'F004r',
  'F008r',
  'F009r',
  'F011r',
  'F012r',
  'F013r',
  'F019r',
  'F020',
  'F023',
  'F100_1',
  'F100',
  'F101',
  'F102_1',
  'F102_2',
  'F102',
  'F103',
  'F200',
  'F201_1',
  'F201_2',
  'F201_3',
  'F202',
  'F210',
  'F211',
  'F221',
  'F300_1',
  'F300_2',
  'F300_3',
  'F300_4',
  'F300_5',
  'F300_BoxCage',
  'F300',
  'F301_1',
  'F301_2',
  'F301_3',
  'F301_4',
  'F301_5',
  'F301_6',
  'F301_7',
  'F301',
  'F302',
  'F303',
  'F400',
  'F401',
  'F402',
  'F403',
  'F404',
  'FruitB',
  'FXLightShaft',
  'GetHeartUtuwa',
  'GoddessCube',
  'GoddessStatue',
  'GoddessSymbolSc',
  'GoddessTBox',
  'GodsMark',
  'GossipStone',
  'IslRouCannon',
  'LavaPlate',
  'LithographyStand',
  'MoleShutter',
  'MoundShovelC',
  'MoundShovelD',
  'Onp',
  'PistonA',
  'PLSwordStick',
  'PropellerLift',
  'PutSizuku',
  'S000',
  'S100',
  'S200',
  'S300',
  'SaveObjectA',
  'SaveObjectB',
  'SaveObjectC',
  'SBAnm',
  'ShiekahStone',
  'ShutterFenceOnly00',
  'ShutterTrolleyDessert',
  'SirenEntrance',
  'SirenExit',
  'StepStatue',
  'SwitchDesertL',
  'SwitchDesertS',
  'SwitchWater',
  'SwitchWheel',
  'SwordCandle',
  'Tansu',
  'TBoxBossT',
  'TBoxNormalT',
  'TBoxSmallT',
  'TeniCrystalA',
  'TeniShip',
  'TerryShop',
  'TimeDoorA',
  'TimeDoorB',
  'TowerD101',
  'TowerHandD101',
  'TrolleyDesertCrystal',
  'TrolleyDesert'
];

let cachedNames: Record<string, string[]> | undefined = undefined;

async function doFetchSingle(name: string): Promise<EventCollection> {
  const resp = await fetch(`${repoUrl}/${name}_zev.dat`);
  const blob = await resp.blob();
  const arr = await blob.arrayBuffer();
  console.log(arr);
  return do_parse_zev(new Uint8Array(arr));
}

async function fetchNames(name: string): Promise<[string, string[]]> {
  const parsed = await doFetchSingle(name);
  const evnt_len = parsed.get_event_count();
  const names = [];
  for (let i = 0; i < evnt_len; i++) {
    names.push(parsed.get_event_name(i));
  }
  parsed.free();
  return [name, names];
}

export async function getAllNames(): Promise<Record<string, string[]>> {
  await init(`${base}/zeldaevent_js_bg.wasm`);
  if (cachedNames === undefined) {
    const responses = await Promise.all(allFiles.map(fetchNames));
    cachedNames = Object.fromEntries(responses);
  }
  return cachedNames;
}

export async function getDotSrcForEvent(zev: string, event: string): Promise<string> {
  await init(`${base}/zeldaevent_js_bg.wasm`);
  const parsed = await doFetchSingle(zev);
  return parsed.get_dot_by_name(event);
}
