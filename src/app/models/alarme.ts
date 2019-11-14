
export class Alarme {
    
    constructor(
        public id?: number,
        public remedio_id?: number,
        public usuario_id?: number,
        public observacao?: string,
        public data?: Date,
        public hora?: Date,
        public dosagem?: number,
        ) { }
}
