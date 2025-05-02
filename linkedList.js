class Node {
    constructor(key=null,value= null, nextNode= null) {
        this.key= key
        this.value= value
        this.nextNode= nextNode
    }
    setNextNode( nextNode){
        this.nextNode= nextNode
    }
    changeValue(value){
        this.value= value
    }
}
export default class LinkedList {
    constructor(){
        this.list= []
    }
    append(key,value){
        if( this.list.length>= 1){
            this.tail().setNextNode(key)
        }
        let newNode= new Node(key,value)
        this.list.push(newNode)
    }
    prepend(key, value){
        let newNode= new Node(key, value, this.head().key)
        this.list.unshift(newNode)
    }
    size(){
        return this.list.length
    }
    head(){
        return this.list.at(0)
    }
    tail(){
        return this.list.at(-1)
    }
    at(index){
        return this.list.at(index)
    }
    pop(){
       this.list.pop()
    }
    contains(key){
        for (let i = 0; i < this.size(); i++) {
            if(this.list[i].key == key) return true
        }
        return false
    }
    find(key){
        for (let i = 0; i < this.size(); i++) {
            if(this.list[i].key == key) return i
        }
        return null
    }
    toString(){
        let finalString= ''
        for (let i = 0; i < this.list.length; i++) {
            let string =  `( ${this.list[i].value} ) -> `
            finalString = finalString.concat(string)
        }
        finalString = finalString.concat('null')
        
       return finalString
    }
    insertAt(value, index){
        this.list[index-1].setNextNode(value)
        let newNode= new Node(value, this.list[index].value)
        this.list.splice(index, 0, newNode)
    }
    removeAt(index){
        this.list.splice(index, 1)
    }
}