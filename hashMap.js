import LinkedList from './linkedList.js'
class HashMap{
    constructor(){
        this.loadFactor= 0.75
        this.capacity= 16
        this.buckets=[]
    }
    hash(key){
        let hashCode=0
        const primeNumber= 31
        for (let i = 0; i < key.length; i++) {
            hashCode=primeNumber* hashCode+key.charCodeAt(i)
            hashCode= hashCode %this.capacity
            
        }
        return hashCode
    }
    length(){
        let count=0
        this.buckets.forEach(bucket=>{
            if(bucket){
                count++
            }
        })
        return count
    }
    checkCapacity(){
        if(this.length() >= this.capacity*this.loadFactor){
            this.capacity = this.capacity*2
            this.rehash()
        }
        
    }
    rehash(){
        const oldBucket= this.buckets
        this.buckets=[]
        oldBucket.forEach(bucket=>{
            if(bucket.size() > 1){
                for (let i = 0; i < bucket.size(); i++) {
                    let keyValue=bucket.at(i).key
                    let value=bucket.at(i).value
                    this.set(keyValue, value)
                    
                }
            }else{
                let keyValue=bucket.head().key
                let value=bucket.head().value
                this.set(keyValue, value)
            }
            
        })

    }
    
    set(key,value){
        let index= this.hash(key)
        this.checkCapacity()
        if(!this.buckets[index] ){
            let linkedList = new LinkedList()
            linkedList.append(key, value)
            this.buckets[index] = linkedList
        }else{
            if(this.buckets[index].head().key == key){
                this.buckets[index].head().changeValue(value)
            }else {
                this.buckets[index].prepend(key, value)
            }
        }
       
    }
    get(key){
        this.buckets.forEach(bucket=>{
            console.log(bucket.toString())
        })
        let index= this.hash(key)
        if(this.buckets[index]){
            let nodeIndex= this.buckets[index].find(key)
            if(nodeIndex !=null){
                return this.buckets[index].at(nodeIndex)
            }
            return null
        }else {
            return null
        }
       
      
    }
    has(key){
        let index= this.hash(key)
        if(this.buckets[index]){
            let node= this.buckets[index].contains(key)
            return node
        }
        return false
    }
    remove(key){
        let index= this.hash(key)
        if(this.buckets[index]){
            let nodeIndex= this.buckets[index].find(key)
            if(nodeIndex !=null){
                this.buckets[index].removeAt(nodeIndex)
                return true
            }
            return false
        }else {
            return false
        }
        
    }
    clear(){
       this.buckets= []
       return this.buckets
    }
    keys(){
        let keysArray=[]
        this.buckets.forEach(bucket=>{
            if(bucket.size() > 1){
                for (let i = 0; i < bucket.size(); i++) {
                    keysArray.push(bucket.at(i).key)
                }
            }else{
                keysArray.push(bucket.head().key)
            }
            
        })
        return keysArray
    }
    values(){
        let valuesArray=[]
        this.buckets.forEach(bucket=>{
            if(bucket.size() > 1){
                for (let i = 0; i < bucket.size(); i++) {
                    valuesArray.push(bucket.at(i).value)
                }
            }else{
                valuesArray.push(bucket.head().value)
            }
            
        })
        return valuesArray
    }
    entries(){
        let entriesArray=[]
        this.buckets.forEach(bucket=>{
            if(bucket.size() > 1){
                for (let i = 0; i < bucket.size(); i++) {
                    let keyValue=[bucket.at(i).key, bucket.at(i).value]
                    entriesArray.push(keyValue)
                }
            }else{
                let keyValue=[bucket.head().key, bucket.head().value]
                entriesArray.push(keyValue)
            }
            
        })
        return entriesArray
    }
}

let hashmap= new HashMap()
hashmap.set('apple', 'red') 
hashmap.set('banana', 'yellow')
hashmap.set('carrot', 'orange')
hashmap.set('dog', 'brown')
hashmap.set('elephant', 'gray')
hashmap.set('frog', 'green')
hashmap.set('grape', 'purple')
hashmap.set('hat', 'black')
hashmap.set('ice cream', 'white')
hashmap.set('jacket', 'blue')
hashmap.set('kite', 'pink')
hashmap.set('lion', 'golden')

console.log(hashmap.get('lion'))

class HashSet extends HashMap{
    constructor(){
        super()
        this.loadFactor= 0.75
        this.capacity= 16
        this.buckets=[]
    }
    set(key){
        let index= this.hash(key)
        this.checkCapacity()
        if(!this.buckets[index] ){
            let linkedList = new LinkedList()
            linkedList.append(key)
            this.buckets[index] = linkedList
        }else{
            this.buckets[index].prepend(key)
        }
       
    }
    values(){
        return super.keys()
    }
    entries(){
        return super.keys()
    }

}

let hashSet = new HashSet()

hashSet.set('apple') 
hashSet.set('banana')
hashSet.set('carrot')
hashSet.set('dog')
hashSet.set('elephant')
hashSet.set('frog')
hashSet.set('grape')
hashSet.set('hat')
hashSet.set('ice cream')
hashSet.set('jacket')
hashSet.set('kite')
hashSet.set('lion')

console.log(hashSet.keys())