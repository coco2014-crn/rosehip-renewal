// ES ModulesはHTML解析後に実行される。要素がないページでも安全に初期化する。
import { initNavigation } from './navigation.js';
import './reservation.js';
import './accordion.js';
import './form.js';

initNavigation();
